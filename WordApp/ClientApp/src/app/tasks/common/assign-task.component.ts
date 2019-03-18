import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public assignedUsers: Array<AssignableUserModel>;
  public userAssignmentForm: FormGroup;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<Array<AssignableUserModel>> = new EventEmitter<Array<AssignableUserModel>>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.assignedUsers = new Array<AssignableUserModel>();
  }

  ngOnInit() {
    this.userAssignmentForm = this.formBuilder.group({
      userList: [this.availableUsers ? this.availableUsers[0]:  '', Validators.required],
      datepicker: ['', Validators.required]
    });
  }

  onAddAssignment() {
    this.submitted = true;
    if (this.userAssignmentForm.valid) {
      var user = <UserModel>this.userAssignmentForm.controls.userList.value;
      var date = <NgbDateStruct>this.userAssignmentForm.controls.datepicker.value;
      this.assignedUsers.push(new AssignableUserModel(user, new Date(date.year, date.month, date.day)));

      var assignedUserIndex = this.availableUsers.findIndex(u => u.id === user.id);
      this.availableUsers.splice(assignedUserIndex, 1);
      this.userAssignmentForm.reset();
      this.submitted = false;
    }
  }

  onRemoveAssignment(assignment: AssignableUserModel) {
    var assignmentIndex = this.assignedUsers.findIndex(a => a.user.id === assignment.user.id);
    this.assignedUsers.splice(assignmentIndex, 1);
    this.availableUsers.push(assignment.user);
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

export class AssignableUserModel {
  public user: UserModel;
  public deadline: Date;

  constructor(user: UserModel, deadline: Date) {
    this.user = user;
    this.deadline = deadline;
  }
}

