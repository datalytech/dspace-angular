import { Component } from '@angular/core';
import {
  ExpandableNavbarSectionComponent as BaseComponent
} from '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';
import { rendersSectionForMenu } from '../../../../../app/shared/menu/menu-section.decorator';
import { MenuID } from '../../../../../app/shared/menu/menu-id.model';
import { slide } from "@dspace/shared/animations";

/**
 * Represents an expandable section in the navbar
 */
@Component({
  selector: 'ds-expandable-navbar-section',
  // templateUrl: './expandable-navbar-section.component.html',
  templateUrl: '../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.html',
  // styleUrls: ['./expandable-navbar-section.component.scss'],
  styleUrls: ['../../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component.scss'],
  animations: [slide]
})
@rendersSectionForMenu(MenuID.PUBLIC, true)
export class ExpandableNavbarSectionComponent extends BaseComponent {
}
