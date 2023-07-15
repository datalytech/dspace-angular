import { Component } from '@angular/core';
import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';
import { slideSidebarPadding } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { FileSizePipe } from '../../../../../../../app/shared/utils/file-size-pipe';
import { ThemedLoadingComponent } from '../../../../../../../app/shared/loading/themed-loading.component';
import { ThemedFileDownloadLinkComponent } from '../../../../../../../app/shared/file-download-link/themed-file-download-link.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-item-page-file-section',
    // templateUrl: './file-section.component.html',
    templateUrl: '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component.html',
    animations: [slideSidebarPadding],
    standalone: true,
    imports: [VarDirective, NgIf, MetadataFieldWrapperComponent, NgFor, ThemedFileDownloadLinkComponent, ThemedLoadingComponent, AsyncPipe, FileSizePipe, TranslateModule]
})
export class FileSectionComponent extends BaseComponent {

}
