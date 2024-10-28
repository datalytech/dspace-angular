import { Component, Inject, OnInit } from '@angular/core';

import { FieldRenderingType, MetadataBoxFieldRendering } from '../metadata-box.decorator';

import { Chips } from '../../../../../../../shared/form/chips/models/chips.model';
import { TranslateService } from '@ngx-translate/core';
import { RenderingTypeStructuredModelComponent } from '../rendering-type-structured.model';
import { LayoutField } from '../../../../../../../core/layout/models/box.model';
import { Item } from '../../../../../../../core/shared/item.model';

/**
 * This component renders the tag metadata fields
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'span[ds-tag]',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
@MetadataBoxFieldRendering(FieldRenderingType.TAG, true)
export class TagComponent extends RenderingTypeStructuredModelComponent implements OnInit {

 /**
  * This is the chips component which will be rendered in the template
  */
  public chips: Chips;

 /**
  * Determines if the current item has the property "dc.subject"
  */
  isDcSubject = false;

  constructor(
    @Inject('fieldProvider') public fieldProvider: LayoutField,
    @Inject('itemProvider') public itemProvider: Item,
    @Inject('renderingSubTypeProvider') public renderingSubTypeProvider: string,
    @Inject('tabNameProvider') public tabNameProvider: string,
    protected translateService: TranslateService
  ) {
    super(fieldProvider, itemProvider, renderingSubTypeProvider, tabNameProvider, translateService);
  }

 /**
  * Initializes chips only for the rendered index value if indexToBeRendered is set or
  * it initializes chips for all values.
  */
  ngOnInit() {
    if ( this.indexToBeRendered > 0 ) {
      this.initChips([this.metadataValues[this.indexToBeRendered]]);
    } else {
      this.initChips(this.metadataValues);
    }
    this.isDcSubject = this.itemHasDcSubject();
  }

 /**
  * Creates the chips component with the required values
  * @params initChipsValues values to be rendered in chip items
  */
  private initChips(initChipsValues: string[]): void {
    this.chips = new Chips(initChipsValues,'value');
  }

  /**
  * Checks whether or not the item has the property "dc.subject" in its metadata property, i.e. metadata.["dc.subject"]
  * @returns {boolean}
  */
  private itemHasDcSubject(): boolean {
    const dcSubject = this.item?.metadata?.["dc.subject"];
    return dcSubject && Array.isArray(dcSubject) && dcSubject.length > 0;
  }
}
