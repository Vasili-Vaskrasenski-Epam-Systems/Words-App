import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserModel } from "./../../models/users/user.model";

import { EnumToArrayPipe } from "./../../infrastructure/pipes/enum-to-array.pipe";

import { EUserType } from './../../app-enums';
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

  constructor(private formBuilder: FormBuilder, private enumToArrayPipe: EnumToArrayPipe, public dialogRef: MatDialogRef<UserEditorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userTypes = this.enumToArrayPipe.transform(EUserType);
  }

  ngOnInit(): void {
    if (this.data) {
      this.editableObject = this.data;
    }
    this.editorForm = this.formBuilder.group({
      userName: [this.editableObject ? this.editableObject.name : '', Validators.required],
      email: [this.editableObject ? this.editableObject.email : '', [Validators.required, Validators.email]],
      password: [this.editableObject ? this.editableObject.password : '', Validators.required],
      userType: [this.editableObject ? this.userTypes.find(ut => ut === this.editableObject.userType.toString()) : this.userTypes[0], Validators.required],
    });
  }

  setEditableObject(user: UserModel) {
    this.editableObject = new UserModel(user.name, user.password, user.userType, user.email, user.id, user.rowVersion);
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
        this.editorForm.controls.email.value,
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);
      this.dialogRef.close(model);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
};
