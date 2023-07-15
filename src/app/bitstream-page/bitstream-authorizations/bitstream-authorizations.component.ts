import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { RemoteData } from '../../core/data/remote-data';
import { DSpaceObject } from '../../core/shared/dspace-object.model';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { ResourcePoliciesComponent } from '../../shared/resource-policies/resource-policies.component';

@Component({
    selector: 'ds-collection-authorizations',
    templateUrl: './bitstream-authorizations.component.html',
    standalone: true,
    imports: [ResourcePoliciesComponent, RouterLink, AsyncPipe, TranslateModule]
})
/**
 * Component that handles the Collection Authorizations
 */
export class BitstreamAuthorizationsComponent<TDomain extends DSpaceObject> implements OnInit {

  /**
   * The initial DSO object
   */
  public dsoRD$: Observable<RemoteData<TDomain>>;

  /**
   * Initialize instance variables
   *
   * @param {ActivatedRoute} route
   */
  constructor(
    private route: ActivatedRoute
  ) {
  }

  /**
   * Initialize the component, setting up the collection
   */
  ngOnInit(): void {
    this.dsoRD$ = this.route.data.pipe(first(), map((data) => data.bitstream));
  }
}
