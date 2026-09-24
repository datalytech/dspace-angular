import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CrisLayoutTab } from '../../core/layout/models/tab.model';
import { Item } from '../../core/shared/item.model';
import { CrisLayoutBox } from '../../core/layout/models/box.model';
import { LayoutBox } from '../enums/layout-box.enum';

@Component({
  selector: 'ds-cris-layout-matrix',
  templateUrl: './cris-layout-matrix.component.html',
  styleUrls: ['./cris-layout-matrix.component.scss']
})
export class CrisLayoutMatrixComponent implements OnChanges {

  /**
   * Tabs to render
   */
  @Input() tab: CrisLayoutTab;

  /**
   * Tabs to render
   */
  @Input() row;

  /**
   * Item that is being viewed
   */
  @Input() item: Item;

  /**
   * A boolean representing if to use an internal padding for the cells
   */
  @Input() showCellPadding = true;

  /**
   * The last Metrics box of the tab: the SDG icons are rendered right after it,
   * so they appear once, below all the metrics
   */
  lastMetricsBox: CrisLayoutBox;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tab) {
      const boxes: CrisLayoutBox[] = [];
      (this.tab?.rows ?? []).forEach((row) =>
        (row.cells ?? []).forEach((cell) => boxes.push(...(cell.boxes ?? [])))
      );
      this.lastMetricsBox = boxes.filter((box) => box.boxType === LayoutBox.METRICS).pop();
    }
  }

  /**
   * Check if style contains 'col' or 'col-x'
   * @param style the style of the cell (a list of classes separated by space)
   */
  hasColClass(style) {
    return style?.split(' ').filter((c) => (c === 'col' || c.startsWith('col-'))).length > 0;
  }

  /**
   * Check if style contains 'row'
   * @param style the style of the row (a list of classes separated by space)
   */
  hasRowClass(style) {
    return style?.split(' ').filter((r) => (r === 'row')).length > 0;
  }

}
