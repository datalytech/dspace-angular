import {Component, Input} from '@angular/core';
import {ItemOperation} from './itemOperation.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ds-item-operation',
    templateUrl: './item-operation.component.html',
    standalone: true,
    imports: [NgIf, RouterLink, NgbTooltipModule, TranslateModule]
})
/**
 * Operation that can be performed on an item
 */
export class ItemOperationComponent {

  @Input() operation: ItemOperation;

}
