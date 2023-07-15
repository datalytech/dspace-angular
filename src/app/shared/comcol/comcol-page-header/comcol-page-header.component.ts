import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ds-comcol-page-header',
    styleUrls: ['./comcol-page-header.component.scss'],
    templateUrl: './comcol-page-header.component.html',
    standalone: true,
    imports: [NgIf]
})
export class ComcolPageHeaderComponent {
  @Input() name: string;
}
