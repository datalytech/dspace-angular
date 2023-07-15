import { DsDynamicLookupRelationExternalSourceTabComponent as BaseComponent } from '../../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/relation-lookup-modal/external-source-tab/dynamic-lookup-relation-external-source-tab.component';
import { Component } from '@angular/core';
import { SEARCH_CONFIG_SERVICE } from '../../../../../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../../../../../app/core/shared/search/search-configuration.service';
import { fadeIn, fadeInOut } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { ErrorComponent } from '../../../../../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../../../../../app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from '../../../../../../../../../app/shared/object-collection/object-collection.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../../../../../app/shared/utils/var.directive';
import { ThemedSearchFormComponent } from '../../../../../../../../../app/shared/search-form/themed-search-form.component';
import { PageSizeSelectorComponent } from '../../../../../../../../../app/shared/page-size-selector/page-size-selector.component';

@Component({
    selector: 'ds-dynamic-lookup-relation-external-source-tab',
    // styleUrls: ['./dynamic-lookup-relation-external-source-tab.component.scss'],
    styleUrls: ['../../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/relation-lookup-modal/external-source-tab/dynamic-lookup-relation-external-source-tab.component.scss'],
    // templateUrl: './dynamic-lookup-relation-external-source-tab.component.html',
    templateUrl: '../../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/relation-lookup-modal/external-source-tab/dynamic-lookup-relation-external-source-tab.component.html',
    providers: [
        {
            provide: SEARCH_CONFIG_SERVICE,
            useClass: SearchConfigurationService
        }
    ],
    animations: [
        fadeIn,
        fadeInOut
    ],
    standalone: true,
    imports: [PageSizeSelectorComponent, ThemedSearchFormComponent, VarDirective, NgIf, ObjectCollectionComponent, ThemedLoadingComponent, ErrorComponent, AsyncPipe, TranslateModule]
})
export class DsDynamicLookupRelationExternalSourceTabComponent extends BaseComponent {

}
