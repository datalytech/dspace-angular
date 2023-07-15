import { Component, Input } from '@angular/core';

import { Policy } from '../../../../core/submission/models/sherpa-policies-details.model';
import { AlertType } from "@dspace/shared/ui";
import { TranslateModule } from '@ngx-translate/core';
import { ContentAccordionComponent } from '../content-accordion/content-accordion.component';
import { NgFor, NgIf, KeyValuePipe } from '@angular/common';

/**
 * This component represents a section that contains the publisher policy informations.
 */
@Component({
    selector: 'ds-publisher-policy',
    templateUrl: './publisher-policy.component.html',
    styleUrls: ['./publisher-policy.component.scss'],
    standalone: true,
    imports: [NgFor, ContentAccordionComponent, NgIf, KeyValuePipe, TranslateModule]
})
export class PublisherPolicyComponent {

  /**
   * Policy to show information from
   */
  @Input() policy: Policy;


  /**
   * The AlertType enumeration
   * @type {AlertType}
   */
  public AlertTypeEnum = AlertType;

}
