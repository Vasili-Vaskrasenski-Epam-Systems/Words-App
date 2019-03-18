import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VerbTaskModel } from "./../models/verb-task.model";
import { VerbModel } from "./../../verbs/verb.model";

import { EnumToArrayPipe } from './../../helpers/enum-to-array.pipe';
import { AlertService } from './../../alert/alert.service';

import { Constants } from './../../app-constants';

@Component({
  selector: 'verb-task-editor-form',
  templateUrl: './verb-task-editor-form.component.html',
})

export class VerbTaskEditorFormComponent implements OnInit {
  public verbAssignmentForm: FormGroup;
  public assignedVerbs: Array<VerbModel>;
  public availableVerbs: Array<VerbModel>;
  private editableObject: VerbTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<VerbTaskModel> = new EventEmitter<VerbTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private pipe: EnumToArrayPipe, private alertService: AlertService) {
    this.assignedVerbs = new Array<VerbModel>();
  }

  ngOnInit(): void {
    this.verbAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      verbList: [this.availableVerbs ? this.availableVerbs[0] : '', Validators.required],
    });
  }

  setEditableObject(task: VerbTaskModel) {
    this.editableObject = new VerbTaskModel(task.name, task.verbs, task.id, task.rowVersion);
    this.assignedVerbs = task.verbs ? new Array<VerbModel>(...task.verbs) : this.assignedVerbs;

    console.log(task);
    console.log(this.assignedVerbs);

    if (this.assignedVerbs) {
      for (var i = 0; i < this.availableVerbs.length; i++) {
        var index = this.availableVerbs.findIndex(aw => aw.id === this.assignedVerbs[i].id);
        if (index !== -1) {
          this.availableVerbs.splice(index, 1);
        }
      }
    }
  }

  public onSubmit(): void {
    if (this.verbAssignmentForm.controls.name.invalid) {
      this.submitted = true;
      return;
    }
    if (this.assignedVerbs.length === 0) {
      this.alertService.error("At least one word should be assigned to the task");
      return;
    }
    else {
      var model = new VerbTaskModel(
        this.verbAssignmentForm.controls.name.value,
        this.assignedVerbs,
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);

      this.submitted = false;
      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }

  public onAddVerb() {
    this.submitted = true;
    if (this.verbAssignmentForm.valid) {
      var verb = <VerbModel>this.verbAssignmentForm.controls.verbList.value;
      this.assignedVerbs.push(verb);

      var index = this.availableVerbs.findIndex(aw => aw.id === verb.id);
      this.availableVerbs.splice(index, 1);
      this.submitted = false;
    }
  }

  public onRemoveVerb(verb: VerbModel) {
    var index = this.assignedVerbs.findIndex(w => w.id === verb.id);
    this.assignedVerbs.splice(index, 1);
    this.availableVerbs.push(verb);

    if (this.availableVerbs.length > 0) {
      this.verbAssignmentForm.controls.verbList.setValue(this.availableVerbs[0]);
    }
  }
};





