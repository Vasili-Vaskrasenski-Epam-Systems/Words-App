import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VerbTaskModel } from "./../models/verb-task.model";
import { VerbModel } from "./../../verbs/verb.model";
import { OrderedVerbTaskModel } from "./../models/ordered-verb-task.model";
import { CommonDraggableListModel } from './../../common/common-draggable-list.component';

import { EnumToArrayPipe } from './../../helpers/enum-to-array.pipe';
import { AlertService } from './../../alert/alert.service';

import { Constants } from './../../app-constants';

@Component({
  selector: 'verb-task-editor-form',
  templateUrl: './verb-task-editor-form.component.html',
})

export class VerbTaskEditorFormComponent implements OnInit {
  public verbAssignmentForm: FormGroup;

  public draggableModels: Array<CommonDraggableListModel>;
  public availableVerbs: Array<VerbModel>;
  private editableObject: VerbTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<VerbTaskModel> = new EventEmitter<VerbTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.draggableModels = new Array<CommonDraggableListModel>();
  }

  ngOnInit(): void {
    this.verbAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      verbList: [this.availableVerbs ? this.availableVerbs[0] : '', Validators.required],
    });
  }

  setEditableObject(task: VerbTaskModel) {
    this.editableObject = new VerbTaskModel(task.name, task.verbs, task.id, task.rowVersion);

    if (task.verbs) {
      this.draggableModels =
        new Array<CommonDraggableListModel>(
          ...task.verbs.map(e => new CommonDraggableListModel(e.order, e.verb, e.verb.commonWord)));
    }

    if (this.draggableModels) {
      for (var i = 0; i < this.draggableModels.length; i++) {
        var index = this.availableVerbs.findIndex(aw => aw.id === this.draggableModels[i].key.verb.id);
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
    if (this.draggableModels.length === 0) {
      this.alertService.error("At least one word should be assigned to the task");
      return;
    }
    else {
      console.log(this.draggableModels);
      var model = new VerbTaskModel(
        this.verbAssignmentForm.controls.name.value,
        this.draggableModels.map(mod => mod.key),
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
    if (this.verbAssignmentForm.controls.verbList.invalid) {
      this.submitted = true;
      return;
    }
    else {
      var verb = <VerbModel>this.verbAssignmentForm.controls.verbList.value;
      //this.assignedVerbs.push(new OrderedVerbTaskModel(this.assignedVerbs.length, verb, Constants.guidEmpty, null));

      var index = this.availableVerbs.findIndex(aw => aw.id === verb.id);
      this.availableVerbs.splice(index, 1);

      this.draggableModels.push(new CommonDraggableListModel(0, new OrderedVerbTaskModel(this.draggableModels.length, verb, Constants.guidEmpty, null), verb.commonWord));

      this.submitted = false;
      this.setVerbListValue();
    }
  }

  public onDeleteVerb(obj: CommonDraggableListModel) {
    var removedInstance = obj.key as OrderedVerbTaskModel;
    this.availableVerbs.push(removedInstance.verb);
    this.setVerbListValue();

    for (var i = 0; i < this.draggableModels.length; i++) {
      var instance = this.draggableModels[i].key as OrderedVerbTaskModel;
      instance.order = i;
      this.draggableModels[i].order = i;
    }
  }

  private setVerbListValue() {
    if (this.availableVerbs.length > 0) {
      this.verbAssignmentForm.controls.verbList.setValue(this.availableVerbs[0]);
    }
    else {
      this.verbAssignmentForm.controls.verbList.setValue(null);
    }
  }
};





