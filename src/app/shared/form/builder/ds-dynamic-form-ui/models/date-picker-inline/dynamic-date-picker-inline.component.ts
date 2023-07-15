import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepicker, NgbDatepickerConfig, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DynamicDatePickerModel,
  DynamicFormControlComponent,
  DynamicFormControlLayout,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'ds-dynamic-date-picker-inline',
    templateUrl: './dynamic-date-picker-inline.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgClass, NgIf]
})
export class DsDatePickerInlineComponent extends DynamicFormControlComponent {

  @Input() bindId = true;
  @Input() group: UntypedFormGroup;
  @Input() layout: DynamicFormControlLayout;
  @Input() model: DynamicDatePickerModel;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgbDatepicker) ngbDatePicker: NgbDatepicker;

  constructor(protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService,
              public config: NgbDatepickerConfig) {

    super(layoutService, validationService);
  }
}
