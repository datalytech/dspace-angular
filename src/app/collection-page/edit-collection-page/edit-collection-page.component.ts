import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditComColPageComponent } from '../../shared/comcol/comcol-forms/edit-comcol-page/edit-comcol-page.component';
import { Collection } from '../../core/shared/collection.model';
import { getCollectionPageRoute } from '../collection-page-routing-paths';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';

/**
 * Component that represents the page where a user can edit an existing Collection
 */
@Component({
    selector: 'ds-edit-collection',
    templateUrl: '../../shared/comcol/comcol-forms/edit-comcol-page/edit-comcol-page.component.html',
    standalone: true,
    imports: [RouterLink, NgFor, NgClass, RouterOutlet, NgIf, AsyncPipe, TranslateModule]
})
export class EditCollectionPageComponent extends EditComColPageComponent<Collection> {
  type = 'collection';

  public constructor(
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(router, route);
  }

  /**
   * Get the collection page url
   * @param collection The collection for which the url is requested
   */
  getPageUrl(collection: Collection): string {
    return getCollectionPageRoute(collection.id);
  }
}
