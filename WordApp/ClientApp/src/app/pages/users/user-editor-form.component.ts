import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from "./../../models/users/user.model";

import { EnumToArrayPipe } from "./../../infrastructure/pipes/enum-to-array.pipe";

import { Enums } from './../../app-enums';
import { Constants } from './../../app-constants';

@Component({
  selector: 'user-editor-form',
  templateUrl: './user-editor-form.component.html',
})

export class UserEditorFormComponent implements OnInit {
  public editorForm: FormGroup;
  private editableObject: UserModel;
  submitted = false;
  userTypes: Array<string>;

  @Output() notifyAboutConfirm: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private enumToArrayPipe: EnumToArrayPipe) {
    this.userTypes = this.enumToArrayPipe.transform(Enums.EUserType);
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      userName: [this.editableObject ? this.editableObject.name : '', Validators.required],
      password: [this.editableObject ? this.editableObject.password : '', Validators.required],
      userType: [this.editableObject ? this.userTypes.find(ut => ut === this.editableObject.userType.toString()) : this.userTypes[0], Validators.required],
    });
  }

  setEditableObject(user: UserModel) {
    this.editableObject = new UserModel(user.name, user.password, user.userType, user.id, user.rowVersion);
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editorForm.invalid) {
      return;
    }
    else {
      var model = new UserModel(
        this.editorForm.controls.userName.value,
        this.editorForm.controls.password.value,
        this.editorForm.controls.userType.value,
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);

      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }
};
