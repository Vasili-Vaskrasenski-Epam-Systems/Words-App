import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "common-select",
  templateUrl: "./select.component.html",
})

export class SelectComponent implements OnInit {
  public selectWordForm: FormGroup;
  @Input() inputObjectArray: Array<CommonSelectModel>;
  @Output() notifyAboutConfirm: EventEmitter<CommonSelectModel> = new EventEmitter<CommonSelectModel>();
  @Output() notifyAboutCancel: EventEmitter<CommonSelectModel> = new EventEmitter<CommonSelectModel>();

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.selectWordForm = this.formBuilder.group({
      selectCtrl: [this.inputObjectArray ? this.inputObjectArray[0] : '', Validators.required],
    }); }

  onConfirm(): void {
    this.notifyAboutConfirm.emit(this.selectWordForm.controls.selectCtrl.value);
  }

  onCancel(): void {
    this.notifyAboutCancel.emit();
  }
}

export class CommonSelectModel {
  public obj: any;
  public text: string;

  constructor(key: any, value: string) {
    this.obj = key;
    this.text = value;
  }
}
