import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import {
  listableObjectComponent
} from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import {
  PublicationComponent as BaseComponent
} from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';
import { filter, Observable, switchMap, take } from 'rxjs';
import { PaginatedList } from '../../../../../../../app/core/data/paginated-list.model';
import { RemoteData } from '../../../../../../../app/core/data/remote-data';
import { Bitstream } from '../../../../../../../app/core/shared/bitstream.model';
import { hasValue } from '../../../../../../../app/shared/empty.util';
import { followLink } from '../../../../../../../app/shared/utils/follow-link-config.model';
import { BitstreamDataService } from '../../../../../../../app/core/data/bitstream-data.service';
import { RouteService } from '../../../../../../../app/core/services/route.service';
import { Router } from '@angular/router';
import { getFirstSucceededRemoteDataPayload } from '../../../../../../../app/core/shared/operators';
import { BitstreamFormat } from '../../../../../../../app/core/shared/bitstream-format.model';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'vtu')
@Component({
  selector: 'ds-publication',
  styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
  templateUrl: './publication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationComponent extends BaseComponent implements OnInit {

  isVideo = false;

  constructor(routeService: RouteService, router: Router, private bitstreamDataService: BitstreamDataService) {
    super(routeService, router);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const videoType: string[] = ['audio', 'video'];
    this.loadRemoteData('ORIGINAL').pipe(
      switchMap((bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) => {
        return bitstreamsRD.payload.page[0].format.pipe(getFirstSucceededRemoteDataPayload());
      })
    ).subscribe((format: BitstreamFormat) => {
      this.isVideo = videoType.includes(format.mimetype.split('/')[0]);
    });
  }

  /**
   * This method will retrieve the next page of Bitstreams from the external BitstreamDataService call.
   * @param bundleName Bundle name
   */
  loadRemoteData(
    bundleName: string
  ): Observable<RemoteData<PaginatedList<Bitstream>>> {
    return this.bitstreamDataService
      .findAllByItemAndBundleName(this.object, bundleName, {}, true, true, followLink('format')).pipe(
        filter(
          (bitstreamsRD: RemoteData<PaginatedList<Bitstream>>) =>
            hasValue(bitstreamsRD) &&
            (hasValue(bitstreamsRD.errorMessage) || hasValue(bitstreamsRD.payload))
        ),
        take(1)
      );
  }
}
