import { Component } from '@angular/core';
import { ItemStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/item-statistics-page/item-statistics-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { StatisticsTableComponent } from '../../../../../app/statistics-page/statistics-table/statistics-table.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-item-statistics-page',
    // styleUrls: ['./item-statistics-page.component.scss'],
    styleUrls: ['../../../../../app/statistics-page/item-statistics-page/item-statistics-page.component.scss'],
    // templateUrl: './item-statistics-page.component.html',
    templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedLoadingComponent, NgFor, StatisticsTableComponent, AsyncPipe, TranslateModule]
})

/**
 * Component representing the statistics page for an item.
 */
export class ItemStatisticsPageComponent extends BaseComponent {}

