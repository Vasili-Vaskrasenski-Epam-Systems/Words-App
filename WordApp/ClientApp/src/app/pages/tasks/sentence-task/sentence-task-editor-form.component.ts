import { Component,  OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Randomizer } from './../../../infrastructure/helpers/randomizer';
import { CommonCountSetterDialogComponent, CountSetterModel } from './../../../common/common-count-setter-dialog.component';

import { SentenceTaskModel } from './../../../models/tasks/sentences/sentence-task.model';
import { OrderedSentenceTaskModel } from "./../../../models/tasks/sentences/ordered-sentence-task.model";
import { SentenceModel } from "./../../../models/sentences/sentence.model";
import { CommonDraggableListModel } from './../../../common/common-draggable-list.component';

import { AlertService } from './../../../alert/alert.service';
import { Constants } from './../../../app-constants';

@Component({
  selector: 'sentence-task-editor-form',
  templateUrl: './sentence-task-editor-form.component.html',
})

export class SentenceTaskEditorFormComponent implements OnInit {
  public sentenceAssignmentForm: FormGroup;
  public assignedSentences: Array<CommonDraggableListModel>;
  public availableSentences: Array<SentenceModel>;
  private editableObject: SentenceTaskModel;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private alertService: AlertService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SentenceTaskEditorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private randomizer: Randomizer) {
    this.assignedSentences = new Array<CommonDraggableListModel>();
  }

  ngOnInit(): void {
    this.availableSentences = this.data.sentences;

    if (this.data.task) {
      this.editableObject = new SentenceTaskModel(this.data.task.name, this.data.task.sentences, this.data.task.id, this.data.task.rowVersion);
        this.assignedSentences = new Array<CommonDraggableListModel>(
          ...this.data.task.sentences.map(e => new CommonDraggableListModel(e.order, e, e.sentence.text)));

        if (this.assignedSentences) {
          for (var i = 0; i < this.assignedSentences.length; i++) {
            var tmpInstance = this.assignedSentences[i].key as OrderedSentenceTaskModel;
            var index = this.availableSentences.findIndex(aw => aw.id === tmpInstance.sentence.id);
            if (index !== -1) {
              this.availableSentences.splice(index, 1);
            }
          }
        }
    }
    this.sentenceAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      sentenceList: [this.availableSentences ? this.availableSentences[0] : '', Validators.required],
    });
  }

  //setEditableObject(task: SentenceTaskModel) {
  //  this.editableObject = new SentenceTaskModel(task.name, task.sentences, task.id, task.rowVersion);
  //  this.assignedSentences = new Array<CommonDraggableListModel>(
  //    ...task.sentences.map(e => new CommonDraggableListModel(e.order, e, e.sentence.text)));

  //  if (this.assignedSentences) {
  //    for (var i = 0; i < this.assignedSentences.length; i++) {
  //      var tmpInstance = this.assignedSentences[i].key as OrderedSentenceTaskModel;
  //      var index = this.availableSentences.findIndex(aw => aw.id === tmpInstance.sentence.id);
  //      if (index !== -1) {
  //        this.availableSentences.splice(index, 1);
  //      }
  //    }
  //  }
  //}

  public onSubmit(): void {
    if (this.sentenceAssignmentForm.controls.name.invalid) {
      this.submitted = true;
      return;
    }
    if (this.assignedSentences.length === 0) {
      this.alertService.error("At least one sentence should be assigned to the task");
      return;
    }
    else {
      this.assignedSentences.forEach(w => (<OrderedSentenceTaskModel>w.key).order = w.order);
      var model = new SentenceTaskModel(
        this.sentenceAssignmentForm.controls.name.value,
        this.assignedSentences.map(w => w.key as OrderedSentenceTaskModel),
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);

      this.submitted = false;
      this.dialogRef.close(model);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onAdd() {
    this.submitted = true;
    if (this.sentenceAssignmentForm.controls.sentenceList.invalid) {
      this.submitted = true;
      return;
    }
    else {
      var sentence = <SentenceModel>this.sentenceAssignmentForm.controls.sentenceList.value;
      this.assignedSentences.push(new CommonDraggableListModel(this.assignedSentences.length, new OrderedSentenceTaskModel(
        this.assignedSentences.length, sentence, Constants.guidEmpty, null), sentence.text));

      var index = this.availableSentences.findIndex(aw => aw.id === sentence.id);
      this.availableSentences.splice(index, 1);
      this.submitted = false;
      this.setSentenceListValue();
    }
  }

  public onDeleteWord(obj: CommonDraggableListModel) {
    var removedInstance = obj.key as OrderedSentenceTaskModel;
    this.availableSentences.push(removedInstance.sentence);
    this.setSentenceListValue();

    for (var i = 0; i < this.assignedSentences.length; i++) {
      var instance = this.assignedSentences[i].key as OrderedSentenceTaskModel;
      instance.order = i;
      this.assignedSentences[i].order = i;
    }
  }

  public onAddRandom() {
    const dialogRef = this.dialog.open(CommonCountSetterDialogComponent, { data: { count: 1, maximumCount: this.availableSentences.length } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var numbers = this.randomizer.getRandomArrayIndexes(this.availableSentences, result);
        var wordsToUse = new Array();
        for (var i = 0; i < numbers.length; i++) {
          wordsToUse.push(this.availableSentences[numbers[i]]);
        }
        wordsToUse.forEach(w => {
          this.sentenceAssignmentForm.controls.sentenceList.setValue(w);
          this.onAdd();
        });
      }
    });
  }

  private setSentenceListValue() {
    if (this.availableSentences.length > 0) {
      this.sentenceAssignmentForm.controls.sentenceList.setValue(this.availableSentences[0]);
    }
    else {
      this.sentenceAssignmentForm.controls.sentenceList.setValue(null);
    }
  }
};





