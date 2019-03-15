import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'common-datepicker',
  templateUrl: './common-datepicker.component.html'
})
export class CommonDatepickerComponent {

  public datepickerForm: FormGroup;

  @Input() submitted: boolean;
  @Input() parentForm: FormGroup;
}
