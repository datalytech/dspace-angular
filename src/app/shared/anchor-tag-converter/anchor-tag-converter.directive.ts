import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { convertAnchorTagsInTextNodes } from '../convert-anchor-tags.util';

/**
 * Turns anchor tags that were stored as plain text in a metadata value into real links.
 */
@Directive({
  selector: '[appAnchorTagConverter]'
})
export class AnchorTagConverterDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const element: HTMLElement = this.el.nativeElement;
    if (!element || element.querySelector('ds-truncatable')) {
      return;
    }
    convertAnchorTagsInTextNodes(element);
  }
}
