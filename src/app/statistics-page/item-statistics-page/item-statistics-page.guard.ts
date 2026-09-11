import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';

import { Item } from '../../core/shared/item.model';
import { AuthService } from '../../core/auth/auth.service';
import { AuthorizationDataService } from '../../core/data/feature-authorization/authorization-data.service';
import { DsoPageSingleFeatureGuard } from '../../core/data/feature-authorization/feature-authorization-guard/dso-page-single-feature.guard';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import { StatisticsItemPageResolver } from '../statistics-item-page.resolver';

@Injectable({
  providedIn: 'root'
})
/**
 * Guard for preventing unauthorized access to the statistics page of a specific {@link Item}.
 * Unlike the generic {@link StatisticsAdministratorGuard}, this guard resolves the {@link Item}
 * from the route and checks the "canViewUsageStatistics" authorization against that item, so
 * anonymous/public users can view the statistics of a publicly readable item whenever the
 * "usage-statistics.authorization.admin.usage" configuration allows it.
 */
export class ItemStatisticsPageGuard extends DsoPageSingleFeatureGuard<Item> {
  constructor(protected resolver: StatisticsItemPageResolver,
              protected authorizationService: AuthorizationDataService,
              protected router: Router,
              protected authService: AuthService) {
    super(resolver, authorizationService, router, authService);
  }

  /**
   * Check usage statistics view rights
   */
  getFeatureID(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FeatureID> {
    return observableOf(FeatureID.CanViewUsageStatistics);
  }
}
