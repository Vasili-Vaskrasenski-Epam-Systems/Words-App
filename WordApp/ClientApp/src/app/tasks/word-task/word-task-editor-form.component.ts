import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WordTaskModel } from "./../models/word-task.model";
import { WordModel } from "./../../words/word.model";
import { CommonSelectModel } from './../../common/select.component';

import { EnumToArrayPipe } from './../../helpers/enum-to-array.pipe';
import { AlertService } from './../../alert/alert.service';

@Component({
  selector: 'word-task-editor-form',
  templateUrl: './word-task-editor-form.component.html',
})

export class WordTaskEditorFormComponent implements OnInit {
  public wordAssignmentForm: FormGroup;
  public assignedWords: Array<WordModel>;
  public availableWords: Array<WordModel>;
  private editableObject: WordTaskModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<WordTaskModel> = new EventEmitter<WordTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private pipe: EnumToArrayPipe, private alertService: AlertService) {
    this.assignedWords = new Array<WordModel>();
  }

  ngOnInit(): void {
    this.wordAssignmentForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
      wordList: [this.availableWords ? this.availableWords[0] : '', Validators.required],
    });
  }

  setEditableObject(task: WordTaskModel) {
    this.editableObject = new WordTaskModel(task.name, task.words, task.id, task.rowVersion);
    this.assignedWords = task.words ? Object.assign([], task.words) : this.assignedWords;

    if (this.assignedWords) {
      for (var i = 0; i < this.assignedWords.length; i++) {
        var index = this.availableWords.findIndex(aw => aw.id === this.assignedWords[i].id);
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
        this.assignedWords,
        this.editableObject ? this.editableObject.id : "00000000-0000-0000-0000-000000000000",
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
    if (this.wordAssignmentForm.valid) {
      var word = <WordModel>this.wordAssignmentForm.controls.wordList.value;
      this.assignedWords.push(word);

      var index = this.availableWords.findIndex(aw => aw.id === word.id);
      this.availableWords.splice(index, 1);
      this.submitted = false;
    }
  }

  public onRemoveWord(word: WordModel) {
    var index = this.assignedWords.findIndex(w => w.id === word.id);
    this.assignedWords.splice(index, 1);
    this.availableWords.push(word);

    if (this.availableWords.length === 1) {
      this.wordAssignmentForm.controls.wordList.setValue(this.availableWords[0]);
    }
  }
};





