import { Component } from '@angular/core';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { ThemedTopLevelCommunityListComponent } from '../../../../app/home-page/top-level-community-list/themed-top-level-community-list.component';
import { ThemedSearchFormComponent } from '../../../../app/shared/search-form/themed-search-form.component';
import { ViewTrackerComponent } from '../../../../app/statistics/angulartics/dspace/view-tracker.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';

@Component({
    selector: 'ds-home-page',
    // styleUrls: ['./home-page.component.scss'],
    styleUrls: ['../../../../app/home-page/home-page.component.scss'],
    // templateUrl: './home-page.component.html'
    templateUrl: '../../../../app/home-page/home-page.component.html',
    standalone: true,
    imports: [ThemedHomeNewsComponent, NgIf, ViewTrackerComponent, ThemedSearchFormComponent, ThemedTopLevelCommunityListComponent, RecentItemListComponent, AsyncPipe, TranslateModule]
})
export class HomePageComponent extends BaseComponent {

}
