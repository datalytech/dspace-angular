import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';

import { environment } from '../../../environments/environment';
import { CrisRefConfig, CrisRefEntityStyleConfig } from '../../../config/layout-config.interfaces';
import { isEmpty, isNotEmpty } from '../empty.util';

/**
 * Directive to add to the element an entity icon based on metadata entity type and entity style
 */
@Directive({
  selector: '[dsEntityIcon]'
})
export class EntityIconDirective implements OnInit, OnChanges {

  /**
   * The metadata entity type
   */
  @Input() entityType = 'default';

  /**
   * The metadata entity style
   */
  @Input() entityStyle: string | string[] = 'default';

  /**
   * A boolean representing if to fallback on default style if the given one is not found
   */
  @Input() fallbackOnDefault = true;

  /**
   * A boolean representing if to show html icon before or after
   */
  @Input() iconPosition = 'after';

  /**
   * A configuration representing crisRef values
   */
  confValue = environment.crisLayout.crisRef;

  /**
   * Keep reference to the inserted icon so we can remove/update it on input changes
   */
  private iconNode: HTMLElement = null;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.entityType ||
      changes.entityStyle ||
      changes.fallbackOnDefault ||
      changes.iconPosition
    ) {
      this.renderIcon();
    }
  }

  private renderIcon(): void {
  this.removeExistingIcon();

  const crisRefConfig: CrisRefConfig = this.getCrisRefConfigByType(this.entityType);

  if (isNotEmpty(crisRefConfig)) {
    const crisStyle: CrisRefEntityStyleConfig = this.getCrisRefEntityStyleConfig(
      crisRefConfig,
      this.entityStyle
    );

    if (isNotEmpty(crisStyle)) {
      this.addIcon(crisStyle);
    }
  }
}

  /**
   * Return the CrisRefConfig by the given type
   */
  private getCrisRefConfigByType(type: string): CrisRefConfig {
    if (isEmpty(type)) {
      return this.fallbackOnDefault
        ? this.confValue.find((config) => config.entityType?.toUpperCase() === 'DEFAULT')
        : null;
    }

    let filteredConf: CrisRefConfig = this.confValue.find(
      (config) => config.entityType?.toUpperCase() === type.toUpperCase()
    );

    if (isEmpty(filteredConf) && this.fallbackOnDefault) {
      filteredConf = this.confValue.find(
        (config) => config.entityType?.toUpperCase() === 'DEFAULT'
      );
    }

    return filteredConf;
  }

  /**
   * Return the CrisRefEntityStyleConfig by the given style
   */
  private getCrisRefEntityStyleConfig(
    crisConfig: CrisRefConfig,
    styles: string | string[]
  ): CrisRefEntityStyleConfig {
    let filteredConf: CrisRefEntityStyleConfig;

    if (Array.isArray(styles)) {
      styles.forEach((style) => {
        if (style && Object.keys(crisConfig.entityStyle).includes(style)) {
          filteredConf = crisConfig.entityStyle[style];
        }
      });
    } else if (styles) {
      filteredConf = crisConfig.entityStyle[styles];
    }

    if (isEmpty(filteredConf) && this.fallbackOnDefault) {
      filteredConf = crisConfig.entityStyle.default;
    }

    return filteredConf;
  }

  /**
   * Attach icon to HTML element
   */

  private addIcon(crisStyle: CrisRefEntityStyleConfig): void {
  const nativeElement = this.elem.nativeElement as HTMLElement;

  const iconElement = this.renderer.createElement('i');

  const classes = `${crisStyle.icon} ${crisStyle.style}`
    .split(' ')
    .filter((cssClass) => !!cssClass);

  classes.forEach((cssClass) => {
    this.renderer.addClass(iconElement, cssClass);
  });

  this.renderer.setAttribute(iconElement, 'aria-hidden', 'true');
  this.renderer.addClass(iconElement, 'ds-entity-icon');

  const space = this.renderer.createText(' ');

  if (this.iconPosition === 'after') {
    this.renderer.appendChild(nativeElement, space);
    this.renderer.appendChild(nativeElement, iconElement);
  } else {
    this.renderer.insertBefore(nativeElement, iconElement, nativeElement.firstChild);
    this.renderer.insertBefore(nativeElement, space, nativeElement.firstChild);
  }

  this.iconNode = iconElement;
}

private removeExistingIcon(): void {
  if (this.iconNode && this.iconNode.parentNode) {
    this.iconNode.parentNode.removeChild(this.iconNode);
  }

  this.iconNode = null;
}

}
