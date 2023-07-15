import { Component } from '@angular/core';
import { SubmissionImportExternalComponent as BaseComponent } from '../../../../../app/submission/import-external/submission-import-external.component';
import { fadeIn } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../../../../libs/shared/ui/src/lib/alert/alert.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '../../../../../app/shared/object-collection/object-collection.component';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';
import { NgIf, AsyncPipe } from '@angular/common';
import { SubmissionImportExternalSearchbarComponent } from '../../../../../app/submission/import-external/import-external-searchbar/submission-import-external-searchbar.component';

/**
 * This component allows to submit a new workspaceitem importing the data from an external source.
 */
@Component({
    selector: 'ds-submission-import-external',
    // styleUrls: ['./submission-import-external.component.scss'],
    styleUrls: ['../../../../../app/submission/import-external/submission-import-external.component.scss'],
    // templateUrl: './submission-import-external.component.html',
    templateUrl: '../../../../../app/submission/import-external/submission-import-external.component.html',
    animations: [fadeIn],
    standalone: true,
    imports: [SubmissionImportExternalSearchbarComponent, NgIf, VarDirective, ObjectCollectionComponent, ThemedLoadingComponent, AlertComponent, RouterLink, AsyncPipe, TranslateModule]
})
export class SubmissionImportExternalComponent extends BaseComponent {

}
