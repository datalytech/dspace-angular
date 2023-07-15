import { EditBitstreamPageComponent as BaseComponent } from '../../../../../app/bitstream-page/edit-bitstream-page/edit-bitstream-page.component';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FileSizePipe } from '../../../../../app/shared/utils/file-size-pipe';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '../../../../../app/shared/form/form.component';
import { ThemedThumbnailComponent } from '../../../../../app/thumbnail/themed-thumbnail.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-edit-bitstream-page',
    // styleUrls: ['./edit-bitstream-page.component.scss'],
    styleUrls: ['../../../../../app/bitstream-page/edit-bitstream-page/edit-bitstream-page.component.scss'],
    // templateUrl: './edit-bitstream-page.component.html',
    templateUrl: '../../../../../app/bitstream-page/edit-bitstream-page/edit-bitstream-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [VarDirective, NgIf, ThemedThumbnailComponent, forwardRef(() => FormComponent), FormsModule, ReactiveFormsModule, RouterLink, ErrorComponent, ThemedLoadingComponent, AsyncPipe, FileSizePipe, TranslateModule]
})
export class EditBitstreamPageComponent extends BaseComponent {
}
