import { Component, Injectable, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

/**
 * This component builds a URL from the value of "handle"
 */

@Component({
    selector: 'ds-comcol-page-handle',
    styleUrls: ['./comcol-page-handle.component.scss'],
    templateUrl: './comcol-page-handle.component.html',
    standalone: true,
    imports: [NgIf, TranslateModule]
})

@Injectable()
export class ComcolPageHandleComponent {

  // Optional title
  @Input() title: string;

  // The value of "handle"
  @Input() content: string;

  public getHandle(): string {
    return this.content;
  }
}
