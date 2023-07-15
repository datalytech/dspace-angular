import { Component } from '@angular/core';
import { CollectionStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/collection-statistics-page/collection-statistics-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { StatisticsTableComponent } from '../../../../../app/statistics-page/statistics-table/statistics-table.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-collection-statistics-page',
    // styleUrls: ['./collection-statistics-page.component.scss'],
    styleUrls: ['../../../../../app/statistics-page/collection-statistics-page/collection-statistics-page.component.scss'],
    // templateUrl: './collection-statistics-page.component.html',
    templateUrl: '../../../../../app/statistics-page/statistics-page/statistics-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedLoadingComponent, NgFor, StatisticsTableComponent, AsyncPipe, TranslateModule]
})

/**
 * Component representing the statistics page for a collection.
 */
export class CollectionStatisticsPageComponent extends BaseComponent {}

