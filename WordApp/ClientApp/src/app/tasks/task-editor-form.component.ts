import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskModel } from "./task.model";

import { Enums } from './../app-enums';
import { EnumToArrayPipe } from './../helpers/enum-to-array.pipe';

@Component({
  selector: 'task-editor-form',
  templateUrl: './task-editor-form.component.html',
})

export class TaskEditorFormComponent implements OnInit {
  public editorForm: FormGroup;
  private editableObject: TaskModel;
  submitted = false;
  taskTypes: Array<string>;

  @Output() notifyAboutConfirm: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private pipe: EnumToArrayPipe) {
    this.taskTypes = pipe.transform(Enums.ETaskType);
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      taskType: [this.editableObject ? this.taskTypes.find(ut => ut === this.editableObject.taskType.toString()) : this.taskTypes[0], Validators.required],
    });
  }

  get f() {
    return this.editorForm.controls;
  }

  setEditableObject(task: TaskModel) {
    this.editableObject = new TaskModel(task.name, task.taskType, task.id, task.rowVersion);
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editorForm.invalid) {
      return;
    }
    else {
      var model = new TaskModel(
        this.f.name.value,
        this.f.taskType.value,
        this.editableObject ? this.editableObject.id : "00000000-0000-0000-0000-000000000000",
        this.editableObject ? this.editableObject.rowVersion : null);

      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }
};





