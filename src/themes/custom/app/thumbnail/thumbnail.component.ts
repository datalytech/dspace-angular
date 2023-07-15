import { Component } from '@angular/core';
import { ThumbnailComponent as BaseComponent } from '../../../../app/thumbnail/thumbnail.component';
import { TranslateModule } from '@ngx-translate/core';
import { SafeUrlPipe } from '../../../../app/shared/utils/safe-url-pipe';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-thumbnail',
    // styleUrls: ['./thumbnail.component.scss'],
    styleUrls: ['../../../../app/thumbnail/thumbnail.component.scss'],
    // templateUrl: './thumbnail.component.html',
    templateUrl: '../../../../app/thumbnail/thumbnail.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedLoadingComponent, NgClass, AsyncPipe, SafeUrlPipe, TranslateModule]
})
export class ThumbnailComponent extends BaseComponent {
}
