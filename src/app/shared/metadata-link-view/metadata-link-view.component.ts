import { Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Observable, of as observableOf } from 'rxjs';
import { map, startWith, switchMap, timeout } from 'rxjs/operators';

import { isEmpty, isNotEmpty } from '../empty.util';
import { Item } from '../../core/shared/item.model';
import { MetadataValue } from '../../core/shared/metadata.models';
import { PLACEHOLDER_PARENT_METADATA } from '../form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants';
import { RemoteData } from '../../core/data/remote-data';
import { ItemDataService } from '../../core/data/item-data.service';
import { getFirstCompletedRemoteData } from '../../core/shared/operators';
import { Metadata } from '../../core/shared/metadata.utils';
import { DSpaceObject } from '../../core/shared/dspace-object.model';
import { environment } from '../../../environments/environment';
import { followLink } from '../utils/follow-link-config.model';
import { MetadataView } from './metadata-view.model';

@Component({
  selector: 'ds-metadata-link-view',
  templateUrl: './metadata-link-view.component.html',
  styleUrls: ['./metadata-link-view.component.scss'],
})
export class MetadataLinkViewComponent implements OnInit, OnChanges {

  /**
   * Time (in ms) we wait for the *cached* lookup of the referenced entity before retrying with a
   * request that bypasses the request/object cache.
   *
   * The lookup reads from the NgRx cache first, and that cache can end up in a state where it never
   * produces a value at all: a request rehydrated from the SSR transfer state that is still marked
   * as pending is never re-sent, because RequestService.shouldDispatchRequest considers loading
   * entries valid; and a request marked as succeeded whose payload is no longer in the object cache
   * makes RemoteDataBuildService.buildPayload wait forever on ObjectCacheService.getByHref, which
   * filters out empty entries. In both cases the field would stay empty until a client side
   * navigation happens to create a fresh request. Retrying uncached recovers from both.
   */
  static readonly CACHED_LOOKUP_TIMEOUT = 3000;

  /**
   * Time (in ms) we wait for the uncached retry before giving up on the entity type, so that an
   * entity that cannot be retrieved at all still leaves the value and its link in place.
   */
  static readonly UNCACHED_LOOKUP_TIMEOUT = 15000;

  /**
   * Metadata value that we need to show in the template
   */
  @Input() metadata: MetadataValue;

  /**
   * Metadata name that we need to show in the template
   */
  @Input() metadataName: string | string[];

  /**
   * Item of the metadata value
   */
  @Input() item: DSpaceObject;
  /**
   * The metadata name from where to take the value of the cris style
   */
  crisRefMetadata = environment.crisLayout.crisRefStyleMetadata;

  /**
   * Processed metadata to create MetadataOrcid with the information needed to show
   */
  metadataView$: Observable<MetadataView>;

  /**
   * Position of the Icon before/after the element
   */
  iconPosition = 'after';

  /**
   * Related item of the metadata value
   */
  relatedItem: Item;

  /**
   * A Map that holds the names and their respective ORCID numbers
   */
  namesOrcidMap = new Map<string, string>();

  /**
   * Map all entities with the icons specified in the environment configuration file
   */
  constructor(
    private itemService: ItemDataService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.item || !this.item) {
      return;
    }

    const orcidContributorsObjs = this.item.metadata?.['dc.contributor.orcid'];

    if (!orcidContributorsObjs || orcidContributorsObjs.length === 0) {
      return;
    }

    const orcidContributors = orcidContributorsObjs.map((item) => item.value);
    this.mapNamesToOrcidNumbers(orcidContributors);
  }

  /**
   * On init process metadata to get the information and form MetadataOrcid model
   */
  ngOnInit(): void {
    this.metadataView$ = observableOf(this.metadata).pipe(
      switchMap((metadataValue: MetadataValue) =>
        this.getMetadataView(metadataValue)
      )
    );
  }

  /**
   * Retrieves the metadata view for a given metadata value.
   * If the metadata value has a valid authority, it retrieves the item using the authority and creates a metadata view.
   * If the metadata value does not have a valid authority, it creates a metadata view with null values.
   *
   * The value and its link are rendered as soon as the metadata value is known, and upgraded with
   * the entity type, style and ORCID once the referenced entity has been retrieved, so that a slow
   * or unusable lookup never leaves the field empty.
   *
   * @param metadataValue The metadata value for which to retrieve the metadata view.
   * @returns An Observable that emits the metadata view.
   */
  private getMetadataView(
    metadataValue: MetadataValue
  ): Observable<MetadataView> {
    if (!Metadata.hasValidAuthority(metadataValue.authority)) {
      return observableOf({
        authority: null,
        value: metadataValue.value,
        orcidAuthenticated: null,
        entityType: null,
        entityStyle: null,
      });
    }

    let resolved$ = this.lookupMetadataView(metadataValue, true);

    if (isPlatformBrowser(this.platformId)) {
      resolved$ = resolved$.pipe(
        timeout({
          first: MetadataLinkViewComponent.CACHED_LOOKUP_TIMEOUT,
          with: () => this.lookupMetadataView(metadataValue, false).pipe(
            timeout({
              first: MetadataLinkViewComponent.UNCACHED_LOOKUP_TIMEOUT,
              with: () => observableOf(this.createUnresolvedMetadataView(metadataValue)),
            })
          ),
        })
      );
    }

    return resolved$.pipe(
      startWith(this.createUnresolvedMetadataView(metadataValue))
    );
  }

  /**
   * Retrieve the referenced entity and turn it into a {@link MetadataView}.
   *
   * @param metadataValue                 The metadata value holding the authority to resolve
   * @param useCachedVersionIfAvailable   Whether a cached version of the referenced entity may be
   *                                      reused, or the request has to be sent again
   */
  private lookupMetadataView(
    metadataValue: MetadataValue,
    useCachedVersionIfAvailable: boolean
  ): Observable<MetadataView> {
    const linksToFollow = [followLink('thumbnail')];

    // reRequestOnStale has to be true: BaseDataService.findByHref skips stale RemoteData objects,
    // so with it disabled a stale cache entry is skipped without ever being requested again and the
    // returned observable never completes.
    return this.itemService
      .findById(metadataValue.authority, useCachedVersionIfAvailable, true, ...linksToFollow)
      .pipe(
        getFirstCompletedRemoteData(),
        map((itemRD: RemoteData<Item>) =>
          this.createMetadataView(itemRD, metadataValue)
        )
      );
  }

  /**
   * Creates a MetadataView object based on the provided itemRD and metadataValue.
   * @param itemRD - The RemoteData object containing the item information.
   * @param metadataValue - The MetadataValue object containing the metadata information.
   * @returns The created MetadataView object.
   */
  private createMetadataView(
    itemRD: RemoteData<Item>,
    metadataValue: MetadataValue
  ): MetadataView {
    if (itemRD.hasSucceeded) {
      this.relatedItem = itemRD.payload;
      const entityStyleValue = this.getCrisRefMetadata(
        itemRD.payload?.entityType
      );
      return {
        authority: metadataValue.authority,
        value: metadataValue.value,
        orcidAuthenticated: this.getOrcid(itemRD.payload),
        entityType: itemRD.payload?.entityType,
        entityStyle: itemRD.payload?.firstMetadataValue(entityStyleValue),
      };
    } else {
      return {
        authority: null,
        value: metadataValue.value,
        orcidAuthenticated: null,
        entityType: 'PRIVATE',
        entityStyle: this.metadataName,
      };
    }
  }

  /**
   * Creates the MetadataView used while the referenced entity has not been retrieved yet, and as a
   * last resort when it cannot be retrieved at all. The value and the link to the entity are
   * already known, its type and style are not, so no icon is rendered.
   *
   * @param metadataValue - The MetadataValue object containing the metadata information.
   */
  private createUnresolvedMetadataView(metadataValue: MetadataValue): MetadataView {
    return {
      authority: metadataValue.authority,
      value: metadataValue.value,
      orcidAuthenticated: null,
      entityType: null,
      entityStyle: null,
    };
  }

  /**
   * Returns the orcid for given item, or null if there is no metadata authenticated for person
   *
   * @param referencedItem Item of the metadata being shown
   */
  getOrcid(referencedItem: Item): string {
    if (referencedItem?.hasMetadata('dspace.orcid.authenticated')) {
      return referencedItem.firstMetadataValue('person.identifier.orcid');
    }
    return null;
  }

  /**
   * Normalize value to display
   *
   * @param value
   */
  normalizeValue(value: string): string {
    if (isNotEmpty(value) && value.includes(PLACEHOLDER_PARENT_METADATA)) {
      return '';
    } else {
      return value;
    }
  }

  private getCrisRefMetadata(entity: string): string {
    if (isEmpty(this.crisRefMetadata)) {
      return 'cris.entity.style';
    }
    let metadata;
    if (isNotEmpty(entity)) {
      const asLowercase = entity.toLowerCase();
      metadata =
        this.crisRefMetadata[
          Object.keys(this.crisRefMetadata).find(
            (k) => k.toLowerCase() === asLowercase
          )
        ];
    }
    return metadata ?? this.crisRefMetadata?.default;
  }

  private mapNamesToOrcidNumbers(orcidContributors: string[]) {
    orcidContributors.forEach((value) => {
      // values are expected to look like "Name, Surname [0000-0000-0000-0000]", anything else is
      // skipped: without this guard a single malformed value throws and breaks the whole component
      const tmp = value?.split('[');
      if (!tmp || tmp.length < 2 || !tmp[1].includes(']')) {
        return;
      }
      this.namesOrcidMap.set(tmp[0].trim(), tmp[1].split(']')[0].trim());
    });
  }
}
