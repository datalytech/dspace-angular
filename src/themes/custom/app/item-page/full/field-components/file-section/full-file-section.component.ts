import { Component } from '@angular/core';
import {
  FullFileSectionComponent as BaseComponent
} from '../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { FileSizePipe } from '../../../../../../../app/shared/utils/file-size-pipe';
import { ThemedFileDownloadLinkComponent } from '../../../../../../../app/shared/file-download-link/themed-file-download-link.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { PaginationComponent } from '../../../../../../../app/shared/pagination/pagination.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../../../app/shared/utils/var.directive';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

@Component({
    selector: 'ds-item-page-full-file-section',
    // styleUrls: ['./full-file-section.component.scss'],
    styleUrls: ['../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component.scss'],
    // templateUrl: './full-file-section.component.html',
    templateUrl: '../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component.html',
    standalone: true,
    imports: [MetadataFieldWrapperComponent, VarDirective, NgIf, PaginationComponent, NgFor, ThemedThumbnailComponent, ThemedFileDownloadLinkComponent, AsyncPipe, FileSizePipe, TranslateModule]
})
export class FullFileSectionComponent extends BaseComponent {
}
