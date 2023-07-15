import { Component } from '@angular/core';
import {
    SubmissionSectionUploadFileComponent as BaseComponent
} from 'src/app/submission/sections/upload/file/section-upload-file.component';
import { TranslateModule } from '@ngx-translate/core';
import { FileSizePipe } from '../../../../../../../app/shared/utils/file-size-pipe';
import { SubmissionSectionUploadFileViewComponent } from '../../../../../../../app/submission/sections/upload/file/view/section-upload-file-view.component';
import { ThemedFileDownloadLinkComponent } from '../../../../../../../app/shared/file-download-link/themed-file-download-link.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { NgIf, AsyncPipe } from '@angular/common';

/**
 * This component represents a single bitstream contained in the submission
 */
@Component({
    selector: 'ds-submission-upload-section-file',
    // styleUrls: ['./section-upload-file.component.scss'],
    styleUrls: ['../../../../../../../app/submission/sections/upload/file/section-upload-file.component.scss'],
    // templateUrl: './section-upload-file.component.html'
    templateUrl: '../../../../../../../app/submission/sections/upload/file/section-upload-file.component.html',
    standalone: true,
    imports: [NgIf, ThemedThumbnailComponent, ThemedFileDownloadLinkComponent, SubmissionSectionUploadFileViewComponent, AsyncPipe, FileSizePipe, TranslateModule]
})
export class SubmissionSectionUploadFileComponent
    extends BaseComponent {
}
