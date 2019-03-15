import { Component, Output, EventEmitter, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UserModel } from "./../../users/user.model";
import { WordTaskModel } from "./../models/word-task.model";
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';

import { AlertService } from './../../alert/alert.service';

@Component({
  selector: 'assign-task-component',
  templateUrl: './assign-task.component.html',
})
export class AssignTaskComponent implements OnInit {
  public availableUsers: Array<UserModel>;
  public assignedUsers: Array<AssignableWordTaskModel>;
  public userAssignmentForm: FormGroup;
  public task: WordTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<Array<AssignableWordTaskModel>> = new EventEmitter<Array<AssignableWordTaskModel>>();
  @Output() notifyAboutCancel = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.userAssignmentForm = this.formBuilder.group({
      userList: ['', Validators.required],
      datepicker: ['', Validators.required]
    });

    this.assignedUsers = new Array<AssignableWordTaskModel>();
  }

  onAddAssignment() {
    this.submitted = true;
    if (this.userAssignmentForm.valid) {
      var user = <UserModel>this.userAssignmentForm.controls.userList.value;
      var date = <NgbDateStruct>this.userAssignmentForm.controls.datepicker.value;
      this.assignedUsers.push(new AssignableWordTaskModel(this.task,
        user,
        null,
        new Date(date.year, date.month, date.day),
        null,
        null,
        '00000000-0000-0000-0000-000000000000',
        null));

      var assignedUserIndex = this.availableUsers.findIndex(u => u.id === user.id);
      this.availableUsers.splice(assignedUserIndex, 1);
      this.userAssignmentForm.reset();
      this.submitted = false;
    }
  }

  onRemoveAssignment(assignment: AssignableWordTaskModel) {
    var assignmentIndex = this.assignedUsers.findIndex(a => a.id === assignment.id);
    this.assignedUsers.splice(assignmentIndex, 1);
    this.availableUsers.push(assignment.user);
  }

  ngOnInit(): void {
    if (this.availableUsers) {
      this.userAssignmentForm.controls.userList.setValue(this.availableUsers[0]);
    }
  }

  onSubmit() {
    if (this.assignedUsers.length === 0) {
      this.alertService.error("You need to add at least one user for task assignment");
      return;
    }

   this.notifyAboutConfirm.emit(this.assignedUsers);
  }

  onCancel() {
    this.notifyAboutCancel.emit();
  }
}

