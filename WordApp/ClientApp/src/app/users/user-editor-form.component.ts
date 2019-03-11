import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserModel } from "./user.model";

import { Enums } from './../app-enums';
import { EnumToArrayPipe } from './../helpers/enum-to-array.pipe';

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

  constructor(private formBuilder: FormBuilder, private pipe: EnumToArrayPipe) {
    this.userTypes = pipe.transform(Enums.EUserType);
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      userName: [this.editableObject ? this.editableObject.name : '', Validators.required],
      password: [this.editableObject ? this.editableObject.password : '', Validators.required],
      userType: [this.editableObject ? this.userTypes.find(ut => ut === this.editableObject.userType.toString()) : this.userTypes[0], Validators.required],
    });
  }

  get f() {
    return this.editorForm.controls;
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
        this.f.userName.value,
        this.f.password.value,
        this.f.userType.value,
        this.editableObject ? this.editableObject.id : "00000000-0000-0000-0000-000000000000",
        this.editableObject ? this.editableObject.rowVersion : null);

      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }
};




