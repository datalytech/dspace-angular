import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RouterReducerState } from '@ngrx/router-store';

import { HeaderState } from './header.reducer';
import { HeaderToggleAction } from './header.actions';
import { AppState } from '../app.reducer';
import { HostWindowService } from '../shared/host-window.service';
import {GLOBAL_CONFIG, GlobalConfig} from '../../config';

const headerStateSelector = (state: AppState) => state.header;
const navCollapsedSelector = createSelector(headerStateSelector, (header: HeaderState) => header.navCollapsed);

@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  /**
   * Whether user is authenticated.
   * @type {Observable<string>}
   */
  public isAuthenticated: Observable<boolean>;
  public isNavBarCollapsed: Observable<boolean>;
  public showAuth = false;
  public homeHref: string;

  constructor(
    @Inject(GLOBAL_CONFIG) public config: GlobalConfig,
    private store: Store<AppState>,
    private windowService: HostWindowService
  ) {
  }

  ngOnInit(): void {
    // set loading
    this.isNavBarCollapsed = this.store.select(navCollapsedSelector);
    this.homeHref = this.config.auth.target.host;
  }

  public toggle(): void {
    this.store.dispatch(new HeaderToggleAction());
  }

}
