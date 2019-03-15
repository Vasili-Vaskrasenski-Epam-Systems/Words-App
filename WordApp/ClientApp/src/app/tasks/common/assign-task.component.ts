import { Component, Output, EventEmitter, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UserModel } from "./../../users/user.model";
import { WordTaskModel } from "./../models/word-task.model";
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

@Component({
  selector: 'assign-task-component',
  templateUrl: './assign-task.component.html',
})
export class AssignTaskComponent implements OnInit {
  public userList: Array<UserModel>;
  public userSelectionForm: FormGroup;
  public task: WordTaskModel;
  public submitted = false;
  public deadline: Date;
  
  @Output() notifyAboutConfirm: EventEmitter<Array<AssignableWordTaskModel>> = new EventEmitter<Array<AssignableWordTaskModel>>();
  @Output() notifyAboutCancel = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder) {
    this.userSelectionForm = this.formBuilder.group({
      userList: new FormArray([], minSelectedCheckboxes(1)),
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

    if (!this.userSelectionForm.valid || !this.deadline) {
      console.log(this.userSelectionForm.value, this.deadline);
      return;
    }

    var formArray = this.userSelectionForm.controls.userList as FormArray;
    var assignableTasks = new Array<AssignableWordTaskModel>();
    for (var i = 0; i < formArray.value.length; i++) {
      if (formArray.value[i]) {
        assignableTasks.push(new AssignableWordTaskModel(this.task, this.userList[i], null, this.deadline, null, '00000000-0000-0000-0000-000000000000', null ));
      };
    }
    
    this.notifyAboutConfirm.emit(assignableTasks);
  }

  onCancel() {
    this.notifyAboutCancel.emit();
  }

  setDeadline(setDate: NgbDateStruct) {
    this.deadline = new Date(setDate.year, setDate.month, setDate.day);
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

