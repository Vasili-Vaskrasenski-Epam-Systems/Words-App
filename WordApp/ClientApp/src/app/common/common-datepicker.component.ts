import { Component, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'common-datepicker',
  templateUrl: './common-datepicker.component.html'
})
export class CommonDatepickerComponent {
  @Output() notifyWhenDateChanged = new EventEmitter<NgbDateStruct>();

  public onDateChanged(date: NgbDateStruct) {
    this.notifyWhenDateChanged.emit(date);
  }
}
