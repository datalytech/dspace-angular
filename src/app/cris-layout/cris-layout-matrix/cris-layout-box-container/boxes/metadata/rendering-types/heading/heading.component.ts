import { Component } from '@angular/core';
import { FieldRenderingType, MetadataBoxFieldRendering } from '../metadata-box.decorator';
import { RenderingTypeValueModelComponent } from '../rendering-type-value.model';

/**
 * This component renders the heading metadata fields
 */
@Component({
  selector: 'ds-heading-row',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
@MetadataBoxFieldRendering(FieldRenderingType.HEADING)
export class HeadingComponent extends RenderingTypeValueModelComponent {
  isOpenAccess = false;
  isClosedAccess = false;
  uhType = undefined;

  ngOnInit() {
    if (this.item) {
      this.isOpenAccess = this.item.metadata['dc.rights']?.some(right => right.value === 'Open Access');
      this.isClosedAccess = this.item.metadata['dc.rights']?.some(right => right.value === 'Closed Access');     
      const uhtype = this.item.metadata['dc.type.uhtype'];
      if (uhtype && uhtype[0] && uhtype[0].value) {
        this.uhType = uhtype[0].value;
      }
    }
  }
}
