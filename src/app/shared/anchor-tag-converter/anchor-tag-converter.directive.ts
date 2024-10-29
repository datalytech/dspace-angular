import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { convertAnchorTags } from '../convert-anchor-tags.util';

@Directive({
  selector: '[appAnchorTagConverter]'
})
export class AnchorTagConverterDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    if (element && !element.querySelector('ds-truncatable')) {
      element.innerHTML = convertAnchorTags(element.innerHTML);
    }
  }
}
