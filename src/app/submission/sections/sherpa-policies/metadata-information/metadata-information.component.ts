import { Component, Input } from '@angular/core';

import { Metadata } from '../../../../core/submission/models/sherpa-policies-details.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, DatePipe } from '@angular/common';

/**
 * This component represents a section that contains the matadata informations.
 */
@Component({
    selector: 'ds-metadata-information',
    templateUrl: './metadata-information.component.html',
    styleUrls: ['./metadata-information.component.scss'],
    standalone: true,
    imports: [NgIf, DatePipe, TranslateModule]
})
export class MetadataInformationComponent {
  /**
   * Metadata to show information from
   */
  @Input() metadata: Metadata;

}
