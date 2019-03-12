import { Component, Output, EventEmitter, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UserModel } from "./../../users/user.model";
import { WordTaskModel } from "./../models/word-task.model";
import { WordModel } from "./../../words/word.model";
import { CommonSelectModel } from './../../common/select.component';

import { EnumToArrayPipe } from './../../helpers/enum-to-array.pipe';
import { AlertService } from './../../alert/alert.service';

@Component({
  selector: 'assign-task-component',
  templateUrl: './assign-task.component.html',
})
export class AssignTaskComponent implements OnInit {
  public userList: Array<UserModel>;
  userSelectionForm: FormGroup;

  submitted = false;

  @Output()notifyAboutConfirm: EventEmitter<Array<UserModel>> = new EventEmitter<Array<UserModel>>();
  @Output() notifyAboutCancel = new EventEmitter();
  @ViewChild('datePicker', { read: ViewContainerRef }) datePicker: ViewContainerRef;


  constructor(private formBuilder: FormBuilder) {
    this.userSelectionForm = this.formBuilder.group({
      userList: new FormArray([], minSelectedCheckboxes(1))
    });
  }

  ngOnInit(): void {
    this.userList.map((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.userSelectionForm.controls.userList as FormArray).push(control);
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.userSelectionForm.valid) {
      return;
    }

    var formArray = this.userSelectionForm.controls.userList as FormArray;
    var pupils = new Array<UserModel>();
    for (var i = 0; i < formArray.value.length; i++) {
      if (formArray.value[i]) {
        pupils.push(this.userList[i]);
      };
    }
    console.log(this.datePicker);
    //this.notifyAboutConfirm.emit(pupils);
  }

  onCancel() {
    this.notifyAboutCancel.emit();
  }

  setDeadline(setDate: NgbDateStruct) {
    console.log(new Date(setDate.year, setDate.month, setDate.day));
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

