import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderedWordTaskModel } from "./../models/ordered-word-task.model";
import { WordTaskModel } from "./../models/word-task.model";
import { WordModel } from "./../../words/word.model";
import { CommonDraggableListModel } from './../../common/common-draggable-list.component';

import { AlertService } from './../../alert/alert.service';
import { Constants } from './../../app-constants';

@Component({
  selector: 'word-task-editor-form',
  templateUrl: './word-task-editor-form.component.html',
})

export class WordTaskEditorFormComponent implements OnInit {
  public wordAssignmentForm: FormGroup;
  public assignedWords: Array<CommonDraggableListModel>;
  public availableWords: Array<WordModel>;
  private editableObject: WordTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<WordTaskModel> = new EventEmitter<WordTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService) {
    this.assignedWords = new Array<CommonDraggableListModel>();
  }

  ngOnInit(): void {
    this.wordAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      isTranslation:[this.editableObject ? this.editableObject.isTranslationTask : false],
      wordList: [this.availableWords ? this.availableWords[0] : '', Validators.required],
    });
    }

  setEditableObject(task: WordTaskModel) {
    this.editableObject = new WordTaskModel(task.name, task.isTranslationTask, task.words, task.id, task.rowVersion);
    this.assignedWords = new Array<CommonDraggableListModel>(
      ...task.words.map(e => new CommonDraggableListModel(e.order, e, e.word.word)));

    console.log(this.wordAssignmentForm, task);
    if (this.assignedWords) {
      for (var i = 0; i < this.assignedWords.length; i++) {
        var tmpInstance = this.assignedWords[i].key as OrderedWordTaskModel;
        var index = this.availableWords.findIndex(aw => aw.id === tmpInstance.word.id);
        if (index !== -1) {
          this.availableWords.splice(index, 1);
        }
      }
    }
  }

  public onSubmit(): void {
    if (this.wordAssignmentForm.controls.name.invalid) {
      this.submitted = true;
      return;
    }
    if (this.assignedWords.length === 0) {
      this.alertService.error("At least one word should be assigned to the task");
      return;
    }
    else {
      var model = new WordTaskModel(
        this.wordAssignmentForm.controls.name.value,
        this.wordAssignmentForm.controls.isTranslation.value,
        this.assignedWords.map(w => w.key),
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);

      this.submitted = false;
      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }

  public onAddWord() {
    this.submitted = true;
    if (this.wordAssignmentForm.controls.wordList.invalid) {
      this.submitted = true;
      return;
    }
    else {
      var word = <WordModel>this.wordAssignmentForm.controls.wordList.value;
      this.assignedWords.push(new CommonDraggableListModel(0, new OrderedWordTaskModel(this.assignedWords.length, word, Constants.guidEmpty, null), word.word.concat('-', word.transcription)));

      var index = this.availableWords.findIndex(aw => aw.id === word.id);
      this.availableWords.splice(index, 1);
      this.submitted = false;
      this.setWordListValue();
    }
  }

  public onDeleteWord(obj: CommonDraggableListModel) {
    var removedInstance = obj.key as OrderedWordTaskModel;
    this.availableWords.push(removedInstance.word);
    this.setWordListValue();

    for (var i = 0; i < this.assignedWords.length; i++) {
      var instance = this.assignedWords[i].key as OrderedWordTaskModel;
      instance.order = i;
      this.assignedWords[i].order = i;
    }
  }

  private setWordListValue() {
    if (this.availableWords.length > 0) {
      this.wordAssignmentForm.controls.wordList.setValue(this.availableWords[0]);
    }
    else {
      this.wordAssignmentForm.controls.wordList.setValue(null);
    }
  }
};





