import { Component, Input } from '@angular/core';
import { Item } from '../../core/shared/item.model';
import { AlertType } from "@dspace/shared/ui";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../../../libs/shared/ui/src/lib/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ds-item-alerts',
    templateUrl: './item-alerts.component.html',
    styleUrls: ['./item-alerts.component.scss'],
    standalone: true,
    imports: [NgIf, AlertComponent, RouterLink, TranslateModule]
})
/**
 * Component displaying alerts for an item
 */
export class ItemAlertsComponent {
  /**
   * The Item to display alerts for
   */
  @Input() item: Item;

  /**
   * The AlertType enumeration
   * @type {AlertType}
   */
  public AlertTypeEnum = AlertType;
}
