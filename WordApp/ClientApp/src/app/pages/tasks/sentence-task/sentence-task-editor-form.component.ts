import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  @Output() notifyAboutConfirm: EventEmitter<SentenceTaskModel> = new EventEmitter<SentenceTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.assignedSentences = new Array<CommonDraggableListModel>();
  }

  ngOnInit(): void {
    this.sentenceAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      sentenceList: [this.availableSentences ? this.availableSentences[0] : '', Validators.required],
    });
  }

  setEditableObject(task: SentenceTaskModel) {
    this.editableObject = new SentenceTaskModel(task.name, task.sentences, task.id, task.rowVersion);
    this.assignedSentences = new Array<CommonDraggableListModel>(
      ...task.sentences.map(e => new CommonDraggableListModel(e.order, e, e.sentence.text)));

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
      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }

  public onAdd() {
    this.submitted = true;
    if (this.sentenceAssignmentForm.controls.sentenceList.invalid) {
      this.submitted = true;
      return;
    }
    else {
      var sentence = <SentenceModel>this.sentenceAssignmentForm.controls.sentenceList.value;
      this.assignedSentences.push(new CommonDraggableListModel(0, new OrderedSentenceTaskModel(
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

  private setSentenceListValue() {
    if (this.availableSentences.length > 0) {
      this.sentenceAssignmentForm.controls.sentenceList.setValue(this.availableSentences[0]);
    }
    else {
      this.sentenceAssignmentForm.controls.sentenceList.setValue(null);
    }
  }
};





