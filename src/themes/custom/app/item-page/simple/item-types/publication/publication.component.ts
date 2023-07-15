import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { PublicationComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CollectionsComponent } from '../../../../../../../app/item-page/field-components/collections/collections.component';
import { ItemPageUriFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ItemPageAbstractFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { RelatedItemsComponent } from '../../../../../../../app/item-page/simple/related-items/related-items-component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedMetadataRepresentationListComponent } from '../../../../../../../app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ItemPageDateFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { ThemedFileSectionComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ThemedMediaViewerComponent } from '../../../../../../../app/item-page/media-viewer/themed-media-viewer.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { MiradorViewerComponent } from '../../../../../../../app/item-page/mirador-viewer/mirador-viewer.component';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { NgIf, AsyncPipe } from '@angular/common';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'custom')
@Component({
    selector: 'ds-publication',
    // styleUrls: ['./publication.component.scss'],
    styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
    // templateUrl: './publication.component.html',
    templateUrl: '../../../../../../../app/item-page/simple/item-types/publication/publication.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ThemedResultsBackButtonComponent, MiradorViewerComponent, ThemedItemPageTitleFieldComponent, DsoEditMenuComponent, MetadataFieldWrapperComponent, ThemedThumbnailComponent, ThemedMediaViewerComponent, ThemedFileSectionComponent, ItemPageDateFieldComponent, ThemedMetadataRepresentationListComponent, GenericItemPageFieldComponent, RelatedItemsComponent, ItemPageAbstractFieldComponent, ItemPageUriFieldComponent, CollectionsComponent, RouterLink, AsyncPipe, TranslateModule]
})
export class PublicationComponent extends BaseComponent {

}
