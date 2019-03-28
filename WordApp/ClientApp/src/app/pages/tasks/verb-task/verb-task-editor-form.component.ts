import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Randomizer } from './../../../infrastructure/helpers/randomizer';
import { CommonCountSetterDialogComponent, CountSetterModel } from './../../../common/common-count-setter-dialog.component';

import { VerbTaskModel } from "./../../../models/tasks/verbs/verb-task.model";
import { VerbModel } from "./../../../models/verbs/verb.model";
import { OrderedVerbTaskModel } from "./../../../models/tasks/verbs/ordered-verb-task.model";
import { CommonDraggableListModel } from './../../../common/common-draggable-list.component';

import { AlertService } from './../../../alert/alert.service';
import { Constants } from './../../../app-constants';

@Component({
  selector: 'verb-task-editor-form',
  templateUrl: './verb-task-editor-form.component.html',
})

export class VerbTaskEditorFormComponent implements OnInit {
  public verbAssignmentForm: FormGroup;

  public assignedVerbs: Array<CommonDraggableListModel>;
  public availableVerbs: Array<VerbModel>;
  private editableObject: VerbTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<VerbTaskModel> = new EventEmitter<VerbTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, public dialog: MatDialog,
    private randomizer: Randomizer) {
    this.assignedVerbs = new Array<CommonDraggableListModel>();
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
      this.assignedVerbs =
        new Array<CommonDraggableListModel>(
          ...task.verbs.map(e => new CommonDraggableListModel(e.order, e, e.verb.commonWord)));
    }

    if (this.assignedVerbs) {
      for (var i = 0; i < this.assignedVerbs.length; i++) {
        var tmpInstance = this.assignedVerbs[i].key as OrderedVerbTaskModel;
        var index = this.availableVerbs.findIndex(aw => aw.id === tmpInstance.id);
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
      this.assignedVerbs.forEach(w => (<OrderedVerbTaskModel>w.key).order = w.order);
      var model = new VerbTaskModel(
        this.verbAssignmentForm.controls.name.value,
        this.assignedVerbs.map(v => v.key),
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
      
      var index = this.availableVerbs.findIndex(aw => aw.id === verb.id);
      this.availableVerbs.splice(index, 1);

      this.assignedVerbs.push(new CommonDraggableListModel(this.assignedVerbs.length, new OrderedVerbTaskModel(this.assignedVerbs.length, verb, Constants.guidEmpty, null), verb.commonWord));

      this.submitted = false;
      this.setVerbListValue();
    }
  }

  public onDeleteVerb(obj: CommonDraggableListModel) {
    var removedInstance = obj.key as OrderedVerbTaskModel;
    this.availableVerbs.push(removedInstance.verb);
    this.setVerbListValue();

    for (var i = 0; i < this.assignedVerbs.length; i++) {
      var instance = this.assignedVerbs[i].key as OrderedVerbTaskModel;
      instance.order = i;
      this.assignedVerbs[i].order = i;
    }
  }

  public onAddRandom() {
    const dialogRef = this.dialog.open(CommonCountSetterDialogComponent, { data: {count: 1, maximumCount: this.availableVerbs.length } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var numbers = this.randomizer.getRandomArrayIndexes(this.availableVerbs, result);
        var wordsToUse = new Array();
        for (var i = 0; i < numbers.length; i++) {
          wordsToUse.push(this.availableVerbs[numbers[i]]);
        }
        wordsToUse.forEach(w => {
          this.verbAssignmentForm.controls.verbList.setValue(w);
          this.onAddVerb();
        });
      }
    });
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





