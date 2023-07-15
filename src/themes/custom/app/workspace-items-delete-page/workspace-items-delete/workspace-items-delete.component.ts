import { Component } from '@angular/core';
import { WorkspaceItemsDeletePageComponent as BaseComponent } from '../../../../../app/workspaceitems-edit-page/workspaceitems-delete-page/workspaceitems-delete-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModifyItemOverviewComponent } from '../../../../../app/item-page/edit-item-page/modify-item-overview/modify-item-overview.component';
import { NgIf, AsyncPipe } from '@angular/common';


@Component({
    selector: 'ds-workspaceitems-delete-page',
    templateUrl: '../../../../../app/workspaceitems-edit-page/workspaceitems-delete-page/workspaceitems-delete-page.component.html',
    standalone: true,
    imports: [NgIf, ModifyItemOverviewComponent, AsyncPipe, TranslateModule]
})
export class WorkspaceItemsDeletePageComponent extends BaseComponent {
}
