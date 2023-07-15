import { Component } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { BrowserOnlyPipe } from '../../../../../app/shared/utils/browser-only.pipe';
import { ListableObjectComponentLoaderComponent } from '../../../../../app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { ImportableListItemControlComponent } from '../../../../../app/shared/object-collection/shared/importable-list-item-control/importable-list-item-control.component';
import { SelectableListItemControlComponent } from '../../../../../app/shared/object-collection/shared/selectable-list-item-control/selectable-list-item-control.component';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { PaginationComponent } from '../../../../../app/shared/pagination/pagination.component';

/**
 * A component to display the "Browse By" section of a Community or Collection page
 * It expects the ID of the Community or Collection as input to be passed on as a scope
 */
@Component({
    selector: 'ds-object-list',
    // styleUrls: ['./object-list.component.scss'],
    styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss'],
    // templateUrl: 'object-list.component.html'
    templateUrl: '../../../../../app/shared/object-list/object-list.component.html',
    standalone: true,
    imports: [PaginationComponent, NgIf, NgClass, NgFor, SelectableListItemControlComponent, ImportableListItemControlComponent, ListableObjectComponentLoaderComponent, BrowserOnlyPipe]
})

export class ObjectListComponent extends BaseComponent {}
