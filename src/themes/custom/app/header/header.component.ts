import { Component } from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImpersonateNavbarComponent } from '../../../../app/shared/impersonate-navbar/impersonate-navbar.component';
import { ThemedAuthNavMenuComponent } from '../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ContextHelpToggleComponent } from '../../../../app/header/context-help-toggle/context-help-toggle.component';
import { LangSwitchComponent } from '../../../../app/shared/lang-switch/lang-switch.component';
import { ThemedSearchNavbarComponent } from '../../../../app/search-navbar/themed-search-navbar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
    selector: 'ds-header',
    // styleUrls: ['header.component.scss'],
    styleUrls: ['../../../../app/header/header.component.scss'],
    // templateUrl: 'header.component.html',
    templateUrl: '../../../../app/header/header.component.html',
    standalone: true,
    imports: [RouterLink, NgbDropdownModule, ThemedSearchNavbarComponent, LangSwitchComponent, ContextHelpToggleComponent, ThemedAuthNavMenuComponent, ImpersonateNavbarComponent, TranslateModule]
})
export class HeaderComponent extends BaseComponent {
}
