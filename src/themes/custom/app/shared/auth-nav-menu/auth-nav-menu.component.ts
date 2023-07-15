import { Component } from '@angular/core';
import {
  AuthNavMenuComponent as BaseComponent,
} from '../../../../../app/shared/auth-nav-menu/auth-nav-menu.component';
import { fadeInOut, fadeOut } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { BrowserOnlyPipe } from '../../../../../app/shared/utils/browser-only.pipe';
import { UserMenuComponent } from '../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogInComponent } from '../../../../../app/shared/log-in/log-in.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';

/**
 * Component representing the {@link AuthNavMenuComponent} of a page
 */
@Component({
    selector: 'ds-auth-nav-menu',
    // templateUrl: 'auth-nav-menu.component.html',
    templateUrl: '../../../../../app/shared/auth-nav-menu/auth-nav-menu.component.html',
    // styleUrls: ['auth-nav-menu.component.scss'],
    styleUrls: ['../../../../../app/shared/auth-nav-menu/auth-nav-menu.component.scss'],
    animations: [fadeInOut, fadeOut],
    standalone: true,
    imports: [NgClass, NgIf, NgbDropdownModule, LogInComponent, RouterLink, RouterLinkActive, UserMenuComponent, AsyncPipe, BrowserOnlyPipe, TranslateModule]
})
export class AuthNavMenuComponent extends BaseComponent {
}
