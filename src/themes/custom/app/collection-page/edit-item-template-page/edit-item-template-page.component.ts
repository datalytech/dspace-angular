import { Component } from '@angular/core';
import {
  EditItemTemplatePageComponent as BaseComponent
} from '../../../../../app/collection-page/edit-item-template-page/edit-item-template-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from '../../../../../../libs/shared/ui/src/lib/alert/alert.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { RouterLink } from '@angular/router';
import { ThemedDsoEditMetadataComponent } from '../../../../../app/dso-shared/dso-edit-metadata/themed-dso-edit-metadata.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-edit-item-template-page',
    styleUrls: ['./edit-item-template-page.component.scss'],
    // templateUrl: './edit-item-template-page.component.html',
    templateUrl: '../../../../../app/collection-page/edit-item-template-page/edit-item-template-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedDsoEditMetadataComponent, RouterLink, ThemedLoadingComponent, AlertComponent, AsyncPipe, TranslateModule]
})
/**
 * Component for editing the item template of a collection
 */
export class EditItemTemplatePageComponent extends BaseComponent {
}
