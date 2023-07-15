import { Component } from '@angular/core';
import { WorkflowItemDeleteComponent as BaseComponent } from '../../../../../app/workflowitems-edit-page/workflow-item-delete/workflow-item-delete.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModifyItemOverviewComponent } from '../../../../../app/item-page/edit-item-page/modify-item-overview/modify-item-overview.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-workflow-item-delete',
    // styleUrls: ['workflow-item-delete.component.scss'],
    // templateUrl: './workflow-item-delete.component.html'
    templateUrl: '../../../../../app/workflowitems-edit-page/workflow-item-action-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ModifyItemOverviewComponent, AsyncPipe, TranslateModule]
})
/**
 * Component representing a page to delete a workflow item
 */
export class WorkflowItemDeleteComponent extends BaseComponent {
}
