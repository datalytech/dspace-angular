import { Component } from '@angular/core';
import { HeaderNavbarWrapperComponent as BaseComponent } from '../../../../app/header-nav-wrapper/header-navbar-wrapper.component';
import { ThemedHeaderComponent } from '../../../../app/header/themed-header.component';
import { NgClass, AsyncPipe } from '@angular/common';

/**
 * This component represents a wrapper for the horizontal navbar and the header
 */
@Component({
    selector: 'ds-header-navbar-wrapper',
    styleUrls: ['../../../../app/header-nav-wrapper/header-navbar-wrapper.component.scss'],
    templateUrl: 'header-navbar-wrapper.component.html',
    standalone: true,
    imports: [NgClass, ThemedHeaderComponent, AsyncPipe]
})
export class HeaderNavbarWrapperComponent extends BaseComponent {
}
