import { Component } from '@angular/core';
import { StatisticsPageComponent } from '../statistics-page/statistics-page.component';
import { UsageReportDataService } from '../../core/statistics/usage-report-data.service';
import { ActivatedRoute , Router} from '@angular/router';
import { Collection } from '../../core/shared/collection.model';
import { DSONameService } from '../../core/breadcrumbs/dso-name.service';
import { AuthService } from '../../core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { StatisticsTableComponent } from '../statistics-table/statistics-table.component';
import { ThemedLoadingComponent } from '../../shared/loading/themed-loading.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../shared/utils/var.directive';

/**
 * Component representing the statistics page for a collection.
 */
@Component({
    selector: 'ds-collection-statistics-page',
    templateUrl: '../statistics-page/statistics-page.component.html',
    styleUrls: ['./collection-statistics-page.component.scss'],
    standalone: true,
    imports: [VarDirective, NgIf, ThemedLoadingComponent, NgFor, StatisticsTableComponent, AsyncPipe, TranslateModule]
})
export class CollectionStatisticsPageComponent extends StatisticsPageComponent<Collection> {

  /**
   * The report types to show on this statistics page.
   */
  types: string[] = [
    'TotalVisits',
    'TotalVisitsPerMonth',
    'TopCountries',
    'TopCities',
  ];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected authService: AuthService
  ) {
    super(
      route,
      router,
      usageReportService,
      nameService,
      authService,
    );
  }
}
