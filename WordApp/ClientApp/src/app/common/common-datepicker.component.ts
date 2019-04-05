import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'common-datepicker',
  templateUrl: './common-datepicker.component.html'
})
export class CommonDatepickerComponent {

  public datepickerForm: FormGroup;

  @Input() submitted: boolean;
  @Input() parentForm: FormGroup;
  @Output() notifyAboutDateChanged: EventEmitter<NgbDateStruct> = new EventEmitter<NgbDateStruct>();

  dateChanged(obj: NgbDateStruct) {
    this.notifyAboutDateChanged.emit(obj);
  }
}
