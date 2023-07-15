import { Component } from '@angular/core';
import { ProfilePageComponent as BaseComponent } from '../../../../app/profile-page/profile-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilePageSecurityFormComponent } from '../../../../app/profile-page/profile-page-security-form/profile-page-security-form.component';
import { ProfilePageMetadataFormComponent } from '../../../../app/profile-page/profile-page-metadata-form/profile-page-metadata-form.component';
import { ProfilePageResearcherFormComponent } from '../../../../app/profile-page/profile-page-researcher-form/profile-page-researcher-form.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-profile-page',
    // styleUrls: ['./profile-page.component.scss'],
    styleUrls: ['../../../../app/profile-page/profile-page.component.scss'],
    // templateUrl: './profile-page.component.html'
    templateUrl: '../../../../app/profile-page/profile-page.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ProfilePageResearcherFormComponent, ProfilePageMetadataFormComponent, ProfilePageSecurityFormComponent, NgFor, AsyncPipe, TranslateModule]
})
/**
 * Component for a user to edit their profile information
 */
export class ProfilePageComponent extends BaseComponent {

}
