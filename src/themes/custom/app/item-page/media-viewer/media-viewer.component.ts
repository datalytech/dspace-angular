import { Component } from '@angular/core';
import {
  MediaViewerComponent as BaseComponent
} from '../../../../../app/item-page/media-viewer/media-viewer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThumbnailComponent } from '../../../../../app/thumbnail/thumbnail.component';
import { ThemedMediaViewerImageComponent } from '../../../../../app/item-page/media-viewer/media-viewer-image/themed-media-viewer-image.component';
import { ThemedMediaViewerVideoComponent } from '../../../../../app/item-page/media-viewer/media-viewer-video/themed-media-viewer-video.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-media-viewer',
    // templateUrl: './media-viewer.component.html',
    templateUrl: '../../../../../app/item-page/media-viewer/media-viewer.component.html',
    // styleUrls: ['./media-viewer.component.scss'],
    styleUrls: ['../../../../../app/item-page/media-viewer/media-viewer.component.scss'],
    standalone: true,
    imports: [VarDirective, NgIf, ThemedLoadingComponent, ThemedMediaViewerVideoComponent, ThemedMediaViewerImageComponent, ThumbnailComponent, AsyncPipe, TranslateModule]
})
export class MediaViewerComponent extends BaseComponent {
}
