import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommunityPageComponent as BaseComponent} from '../../../../app/community-page/community-page.component';
import { fadeInOut } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { ErrorComponent } from '../../../../app/shared/error/error.component';
import { ThemedCollectionPageSubCollectionListComponent } from '../../../../app/community-page/sub-collection-list/themed-community-page-sub-collection-list.component';
import { ThemedCommunityPageSubCommunityListComponent } from '../../../../app/community-page/sub-community-list/themed-community-page-sub-community-list.component';
import { ThemedComcolPageBrowseByComponent } from '../../../../app/shared/comcol/comcol-page-browse-by/themed-comcol-page-browse-by.component';
import { DsoPageSubscriptionButtonComponent } from '../../../../app/shared/dso-page/dso-page-subscription-button/dso-page-subscription-button.component';
import { DsoEditMenuComponent } from '../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ComcolPageContentComponent } from '../../../../app/shared/comcol/comcol-page-content/comcol-page-content.component';
import { ThemedComcolPageHandleComponent } from '../../../../app/shared/comcol/comcol-page-handle/themed-comcol-page-handle.component';
import { ComcolPageLogoComponent } from '../../../../app/shared/comcol/comcol-page-logo/comcol-page-logo.component';
import { ComcolPageHeaderComponent } from '../../../../app/shared/comcol/comcol-page-header/comcol-page-header.component';
import { ViewTrackerComponent } from '../../../../app/statistics/angulartics/dspace/view-tracker.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../app/shared/utils/var.directive';


@Component({
    selector: 'ds-community-page',
    // templateUrl: './community-page.component.html',
    templateUrl: '../../../../app/community-page/community-page.component.html',
    // styleUrls: ['./community-page.component.scss']
    styleUrls: ['../../../../app/community-page/community-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInOut],
    standalone: true,
    imports: [VarDirective, NgIf, ViewTrackerComponent, ComcolPageHeaderComponent, ComcolPageLogoComponent, ThemedComcolPageHandleComponent, ComcolPageContentComponent, DsoEditMenuComponent, DsoPageSubscriptionButtonComponent, ThemedComcolPageBrowseByComponent, ThemedCommunityPageSubCommunityListComponent, ThemedCollectionPageSubCollectionListComponent, ErrorComponent, ThemedLoadingComponent, AsyncPipe, TranslateModule]
})
/**
 * This component represents a detail page for a single community
 */
export class CommunityPageComponent extends BaseComponent {}
