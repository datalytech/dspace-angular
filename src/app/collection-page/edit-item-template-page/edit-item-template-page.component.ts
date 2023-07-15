import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RemoteData } from '../../core/data/remote-data';
import { Collection } from '../../core/shared/collection.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { first, map, switchMap } from 'rxjs/operators';
import { ItemTemplateDataService } from '../../core/data/item-template-data.service';
import { getCollectionEditRoute } from '../collection-page-routing-paths';
import { Item } from '../../core/shared/item.model';
import { getFirstSucceededRemoteDataPayload } from '../../core/shared/operators';
import { DSONameService } from '../../core/breadcrumbs/dso-name.service';
import { AlertType } from "@dspace/shared/ui";
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../../libs/shared/ui/src/lib/alert/alert.component';
import { ThemedLoadingComponent } from '../../shared/loading/themed-loading.component';
import { ThemedDsoEditMetadataComponent } from '../../dso-shared/dso-edit-metadata/themed-dso-edit-metadata.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../shared/utils/var.directive';

@Component({
    selector: 'ds-edit-item-template-page',
    templateUrl: './edit-item-template-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedDsoEditMetadataComponent, RouterLink, ThemedLoadingComponent, AlertComponent, AsyncPipe, TranslateModule]
})
/**
 * Component for editing the item template of a collection
 */
export class EditItemTemplatePageComponent implements OnInit {

  /**
   * The collection to edit the item template for
   */
  collectionRD$: Observable<RemoteData<Collection>>;

  /**
   * The template item
   */
  itemRD$: Observable<RemoteData<Item>>;

  /**
   * The AlertType enumeration
   * @type {AlertType}
   */
  AlertTypeEnum = AlertType;

  constructor(
    protected route: ActivatedRoute,
    public itemTemplateService: ItemTemplateDataService,
    public dsoNameService: DSONameService,
  ) {
  }

  ngOnInit(): void {
    this.collectionRD$ = this.route.parent.data.pipe(first(), map((data) => data.dso));
    this.itemRD$ = this.collectionRD$.pipe(
      getFirstSucceededRemoteDataPayload(),
      switchMap((collection) => this.itemTemplateService.findByCollectionID(collection.id)),
    );
  }

  /**
   * Get the URL to the collection's edit page
   * @param collection
   */
  getCollectionEditUrl(collection: Collection): string {
    if (collection) {
      return getCollectionEditRoute(collection.uuid);
    } else {
      return '';
    }
  }

}
