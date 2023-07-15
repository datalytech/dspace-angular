import { Component } from '@angular/core';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from "@dspace/shared/animations";
import { TranslateModule } from '@ngx-translate/core';
import { UserMenuComponent } from '../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { NgClass, NgIf, NgFor, NgComponentOutlet, AsyncPipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component representing the public navbar
 */
@Component({
    selector: 'ds-navbar',
    // styleUrls: ['./navbar.component.scss'],
    styleUrls: ['../../../../app/navbar/navbar.component.scss'],
    // templateUrl: './navbar.component.html',
    templateUrl: '../../../../app/navbar/navbar.component.html',
    animations: [slideMobileNav],
    standalone: true,
    imports: [NgbDropdownModule, NgClass, NgIf, UserMenuComponent, NgFor, NgComponentOutlet, AsyncPipe, TranslateModule]
})
export class NavbarComponent extends BaseComponent {
}
