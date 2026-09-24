import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { RemoteData } from '../../core/data/remote-data';
import { PaginatedList } from '../../core/data/paginated-list.model';
import { PaginationComponentOptions } from '../../shared/pagination/pagination-component-options.model';
import { FindListOptions } from '../../core/data/find-list-options.model';
import { AuthorizationDataService } from '../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import { Audit } from '../../core/audit/model/audit.model';
import { AuditDataService, AuditFilters } from '../../core/audit/audit-data.service';
import { SortDirection } from '../../core/cache/models/sort-options.model';
import { PaginationService } from '../../core/pagination/pagination.service';
import { AUDIT_EXPORT_SCRIPT_NAME, ScriptDataService } from '../../core/data/processes/script-data.service';
import { ProcessParameter } from '../../process-page/processes/process-parameter.model';
import { Process } from '../../process-page/processes/process.model';
import { getProcessDetailRoute } from '../../process-page/process-page-routing.paths';
import { getFirstCompletedRemoteData } from '../../core/shared/operators';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { Router } from '@angular/router';
import { hasValue, isNotEmpty } from '../../shared/empty.util';

/**
 * The audit event types recorded by org.dspace.event.Event - see Event#eventTypeText in the
 * backend. There is no REST endpoint listing these, they are a fixed, small set.
 */
export const AUDIT_EVENT_TYPES = ['CREATE', 'MODIFY', 'MODIFY_METADATA', 'ADD', 'REMOVE', 'DELETE', 'INSTALL'];

/**
 * Component displaying a searchable, exportable, paginated table of all audit events
 */
@Component({
  selector: 'ds-audit-overview',
  templateUrl: './audit-overview.component.html',
})
export class AuditOverviewComponent implements OnInit {

  /**
   * List of all audits matching the current filters
   */
  auditsRD$: Observable<RemoteData<PaginatedList<Audit>>>;

  /**
   * The event types that can be picked in the filter form
   */
  eventTypes = AUDIT_EVENT_TYPES;

  /**
   * The filter form. Every field is optional; an empty field is not sent as a filter.
   */
  filterForm: FormGroup;

  /**
   * The filters currently applied to {@link auditsRD$}, kept separate from the (possibly not yet
   * submitted) form values so that changing a field doesn't refetch until the form is submitted,
   * and so the export button exports exactly what is on screen.
   */
  appliedFilters: AuditFilters = {};

  /**
   * The current pagination configuration for the page used by the FindAll method
   */
  config: FindListOptions = Object.assign(new FindListOptions(), {
    elementsPerPage: 10,
    sort: {
      field: 'timeStamp',
      direction: SortDirection.DESC
    }
  });

  /**
   * The pagination id
   */
  pageId = 'aop';

  /**
   * The current pagination configuration for the page
   */
  pageConfig: PaginationComponentOptions = Object.assign(new PaginationComponentOptions(), {
    id: this.pageId,
    pageSize: 10
  });

  /**
   * Date format to use for start and end time of audits
   */
  dateFormat = 'yyyy-MM-dd HH:mm:ss';

  constructor(protected auditService: AuditDataService,
              protected authorizationService: AuthorizationDataService,
              protected paginationService: PaginationService,
              protected scriptDataService: ScriptDataService,
              protected notificationsService: NotificationsService,
              protected translateService: TranslateService,
              protected router: Router,
              protected formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      objectId: [''],
      epersonId: [''],
      eventType: [''],
      startDate: [''],
      endDate: [''],
    });
    this.setAudits();
  }

  /**
   * Apply the current form values as filters and re-fetch the first page
   */
  search(): void {
    this.appliedFilters = this.filterFormToFilters();
    this.paginationService.resetPage(this.pageId);
    this.setAudits();
  }

  /**
   * Clear every filter field and re-fetch the unfiltered list
   */
  clearFilters(): void {
    this.filterForm.reset({ objectId: '', epersonId: '', eventType: '', startDate: '', endDate: '' });
    this.search();
  }

  private filterFormToFilters(): AuditFilters {
    const value = this.filterForm.value;
    return {
      objectId: value.objectId || undefined,
      epersonId: value.epersonId || undefined,
      eventType: value.eventType || undefined,
      startDate: value.startDate || undefined,
      endDate: value.endDate || undefined,
    };
  }

  /**
   * Whether any filter is currently applied - used to label the export button appropriately
   */
  hasAppliedFilters(): boolean {
    return Object.values(this.appliedFilters).some((value) => isNotEmpty(value));
  }

  /**
   * Send a request to fetch the audits matching {@link appliedFilters} for the current page
   */
  setAudits() {
    const config$ = this.paginationService.getFindListOptions(this.pageId, this.config);
    const isAdmin$ = this.isCurrentUserAdmin();
    this.auditsRD$ = combineLatest([isAdmin$, config$]).pipe(
      mergeMap(([isAdmin, config]) => {
        if (isAdmin) {
          return this.auditService.findByFilters(this.appliedFilters, config);
        }
        return EMPTY;
      })
    );
  }

  isCurrentUserAdmin(): Observable<boolean> {
    return this.authorizationService.isAuthorized(FeatureID.AdministratorOf, undefined, undefined);
  }

  /**
   * Get the name of an EPerson by ID
   * @param audit  Audit object
   */
  getEpersonName(audit: Audit): Observable<string> {
    return this.auditService.getEpersonName(audit);
  }

  /**
   * Start the audit-export script for the filters currently applied to the table (or the whole
   * history, if none are applied), and navigate to its process page once started.
   */
  exportCsv(): void {
    const filters = this.appliedFilters;
    const parameterValues: ProcessParameter[] = [];
    if (hasValue(filters.objectId)) {
      parameterValues.push(Object.assign(new ProcessParameter(), { name: '-o', value: filters.objectId }));
    }
    if (hasValue(filters.epersonId)) {
      parameterValues.push(Object.assign(new ProcessParameter(), { name: '-p', value: filters.epersonId }));
    }
    if (hasValue(filters.eventType)) {
      parameterValues.push(Object.assign(new ProcessParameter(), { name: '-t', value: filters.eventType }));
    }
    if (hasValue(filters.startDate)) {
      parameterValues.push(Object.assign(new ProcessParameter(), { name: '-f', value: filters.startDate }));
    }
    if (hasValue(filters.endDate)) {
      parameterValues.push(Object.assign(new ProcessParameter(), { name: '-u', value: filters.endDate }));
    }

    this.scriptDataService.invoke(AUDIT_EXPORT_SCRIPT_NAME, parameterValues, []).pipe(
      getFirstCompletedRemoteData(),
      map((rd: RemoteData<Process>) => {
        if (rd.hasSucceeded) {
          this.notificationsService.success(
            this.translateService.get('audit.overview.export.success.title'),
            this.translateService.get('audit.overview.export.success.content'));
          if (isNotEmpty(rd.payload)) {
            this.router.navigateByUrl(getProcessDetailRoute(rd.payload.processId));
          }
        } else {
          this.notificationsService.error(
            this.translateService.get('audit.overview.export.error.title'),
            this.translateService.get('audit.overview.export.error.content'));
        }
      })
    ).subscribe();
  }

}
