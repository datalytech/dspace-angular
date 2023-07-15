import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemStatusComponent as BaseComponent } from '../../../../../../app/item-page/edit-item-page/item-status/item-status.component';
import { fadeIn, fadeInOut } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { ItemOperationComponent } from '../../../../../../app/item-page/edit-item-page/item-operation/item-operation.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'ds-item-status',
    // templateUrl: './item-status.component.html',
    templateUrl: '../../../../../../app/item-page/edit-item-page/item-status/item-status.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    animations: [
        fadeIn,
        fadeInOut
    ],
    standalone: true,
    imports: [NgFor, NgIf, RouterLink, NgClass, ItemOperationComponent, AsyncPipe, TranslateModule]
})
export class ItemStatusComponent extends BaseComponent {
}
