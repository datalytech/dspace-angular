import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { AccessControlItem } from './access-control-array-form.component';

@Pipe({
  // eslint-disable-next-line @angular-eslint/pipe-prefix
  name: 'maxStartDate',
  pure: false
})
export class ControlMaxStartDatePipe implements PipeTransform {
  transform(control: AbstractControl, dropdownOptions: AccessControlItem[]): NgbDateStruct | null {
    const { itemName } = control.value;
    const item = dropdownOptions.find((x) => x.name === itemName);
    if (!item?.hasStartDate) {
      return null;
    }
    const date = new Date(item.maxStartDate);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } as NgbDateStruct;
  }

}