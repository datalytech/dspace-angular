import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SEARCH_CONFIG_SERVICE } from '../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../app/core/shared/search/search-configuration.service';
import { ConfigurationSearchPageComponent as BaseComponent } from '../../../../app/search-page/configuration-search-page.component';
import { pushInOut } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { SearchLabelsComponent } from '../../../../app/shared/search/search-labels/search-labels.component';
import { ThemedSearchFormComponent } from '../../../../app/shared/search-form/themed-search-form.component';
import { ThemedSearchSidebarComponent } from '../../../../app/shared/search/search-sidebar/themed-search-sidebar.component';
import { ThemedSearchResultsComponent } from '../../../../app/shared/search/search-results/themed-search-results.component';
import { ViewModeSwitchComponent } from '../../../../app/shared/view-mode-switch/view-mode-switch.component';
import { PageWithSidebarComponent } from '../../../../app/shared/sidebar/page-with-sidebar.component';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
    selector: 'ds-configuration-search-page',
    // styleUrls: ['./configuration-search-page.component.scss'],
    styleUrls: ['../../../../app/shared/search/search.component.scss'],
    // templateUrl: './configuration-search-page.component.html'
    templateUrl: '../../../../app/shared/search/search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pushInOut],
    providers: [
        {
            provide: SEARCH_CONFIG_SERVICE,
            useClass: SearchConfigurationService
        }
    ],
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, PageWithSidebarComponent, ViewModeSwitchComponent, ThemedSearchResultsComponent, ThemedSearchSidebarComponent, ThemedSearchFormComponent, SearchLabelsComponent, AsyncPipe, TranslateModule]
})

/**
 * This component renders a search page using a configuration as input.
 */
export class ConfigurationSearchPageComponent extends BaseComponent {}

