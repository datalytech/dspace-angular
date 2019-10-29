import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { MyDSpaceConfigurationValueType } from './my-dspace-configuration-value-type';
import { RoleService } from '../core/roles/role.service';
import { SearchConfigurationOption } from '../+search-page/search-switch-configuration/search-configuration-option.model';
import { SearchConfigurationService } from '../+search-page/search-service/search-configuration.service';
import { RouteService } from '../core/services/route.service';
import { PaginationComponentOptions } from '../shared/pagination/pagination-component-options.model';
import { SortDirection, SortOptions } from '../core/cache/models/sort-options.model';
import { SearchFixedFilterService } from '../+search-page/search-filters/search-filter/search-fixed-filter.service';

/**
 * Service that performs all actions that have to do with the current mydspace configuration
 */
@Injectable()
export class MyDSpaceConfigurationService extends SearchConfigurationService {
  /**
   * Default pagination settings
   */
  protected defaultPagination = Object.assign(new PaginationComponentOptions(), {
    id: 'mydspace-page',
    pageSize: 10,
    currentPage: 1
  });

  /**
   * Default sort settings
   */
  protected defaultSort = new SortOptions('lastModified', SortDirection.DESC);

  /**
   * Default configuration parameter setting
   */
  protected defaultConfiguration = 'workspace';

  /**
   * Default scope setting
   */
  protected defaultScope = '';

  /**
   * Default query setting
   */
  protected defaultQuery = '';

  private isAdmin$: Observable<boolean>;
  private isController$: Observable<boolean>;
  private isSubmitter$: Observable<boolean>;

  /**
   * Initialize class
   *
   * @param {roleService} roleService
   * @param {SearchFixedFilterService} fixedFilterService
   * @param {RouteService} routeService
   * @param {ActivatedRoute} route
   */
  constructor(protected roleService: RoleService,
              protected fixedFilterService: SearchFixedFilterService,
              protected routeService: RouteService,
              protected route: ActivatedRoute) {

    super(routeService, fixedFilterService, route);

    // override parent class initialization
    this._defaults = null;
    this.initDefaults();

    this.isSubmitter$ = this.roleService.isSubmitter();
    this.isController$ = this.roleService.isController();
    this.isAdmin$ = this.roleService.isAdmin();
  }

  /**
   * Returns the list of available configuration depend on the user role
   *
   * @return {Observable<MyDSpaceConfigurationValueType[]>}
   *    Emits the available configuration list
   */
  public getAvailableConfigurationTypes(): Observable<MyDSpaceConfigurationValueType[]> {
    return combineLatest(this.isSubmitter$, this.isController$, this.isAdmin$).pipe(
      first(),
      map(([isSubmitter, isController, isAdmin]: [boolean, boolean, boolean]) => {
        const availableConf: MyDSpaceConfigurationValueType[] = [];
        if (isSubmitter) {
          availableConf.push(MyDSpaceConfigurationValueType.Workspace);
        }
        if (isController || isAdmin) {
          availableConf.push(MyDSpaceConfigurationValueType.Workflow);
        }
        return availableConf;
      }));
  }

  /**
   * Returns the select options for the available configuration list
   *
   * @return {Observable<SearchConfigurationOption[]>}
   *    Emits the select options list
   */
  public getAvailableConfigurationOptions(): Observable<SearchConfigurationOption[]> {
    return this.getAvailableConfigurationTypes().pipe(
      first(),
      map((availableConfigurationTypes: MyDSpaceConfigurationValueType[]) => {
        const configurationOptions: SearchConfigurationOption[] = [];
        availableConfigurationTypes.forEach((type) => {
          const value = type;
          const label = `mydspace.show.${value}`;
          configurationOptions.push({ value, label });
        });
        return configurationOptions;
      })
    )
  }

}
