import { MetadataRepresentationListComponent as BaseComponent } from '../../../../../../app/item-page/simple/metadata-representation-list/metadata-representation-list.component';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from '../../../../../../app/shared/loading/themed-loading.component';
import { MetadataRepresentationLoaderComponent } from '../../../../../../app/shared/metadata-representation/metadata-representation-loader.component';
import { VarDirective } from '../../../../../../app/shared/utils/var.directive';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MetadataFieldWrapperComponent } from '../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

@Component({
    selector: 'ds-metadata-representation-list',
    // templateUrl: './metadata-representation-list.component.html'
    templateUrl: '../../../../../../app/item-page/simple/metadata-representation-list/metadata-representation-list.component.html',
    standalone: true,
    imports: [MetadataFieldWrapperComponent, NgFor, VarDirective, MetadataRepresentationLoaderComponent, NgIf, ThemedLoadingComponent, AsyncPipe, TranslateModule]
})
export class MetadataRepresentationListComponent extends BaseComponent {

}
