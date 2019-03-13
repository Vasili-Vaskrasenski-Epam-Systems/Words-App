import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'common-datepicker',
  templateUrl: './common-datepicker.component.html'
})
export class CommonDatepickerComponent {
  public datepickerForm: FormGroup;

  @Input() submitted : boolean;
  @Output() notifyWhenDateChanged = new EventEmitter<NgbDateStruct>();

  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.datepickerForm = this.formBuilder.group({
      datepicker: [null, Validators.required],
    });
  }

  public onDateChanged(date: NgbDateStruct) {
    this.notifyWhenDateChanged.emit(this.datepickerForm.controls.datepicker.value);
  }
}
