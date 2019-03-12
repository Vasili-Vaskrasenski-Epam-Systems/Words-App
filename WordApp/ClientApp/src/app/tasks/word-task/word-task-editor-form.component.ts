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
  public editorForm: FormGroup;
  public assignedWords: Array<WordModel>;
  public existingWords: Array<CommonSelectModel>;
  private editableObject: WordTaskModel;
  public showSelect = false;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<WordTaskModel> = new EventEmitter<WordTaskModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private pipe: EnumToArrayPipe, private alertService: AlertService) {
    this.assignedWords = new Array<WordModel>();
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      name: [this.editableObject ? this.editableObject.name : '', Validators.required],
    });
  }

  get f() {
    return this.editorForm.controls;
  }

  setEditableObject(task: WordTaskModel) {
    this.editableObject = new WordTaskModel(task.name, task.words, task.id, task.rowVersion);
    this.assignedWords = task.words ? Object.assign([], task.words) : this.assignedWords;
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editorForm.invalid) {
      return;
    }
    else if (this.assignedWords.length == 0) {
      this.alertService.error("At least one word should be assigned to the task");
      return;
    }
    else {
      var model = new WordTaskModel(
        this.f.name.value,
        this.assignedWords,
        this.editableObject ? this.editableObject.id : "00000000-0000-0000-0000-000000000000",
        this.editableObject ? this.editableObject.rowVersion : null);

      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }

  public showAddWordForm() {
    this.showSelect = true;
  }

  public getSelectedValue(obj: any) {
    this.assignedWords.push((<CommonSelectModel>obj).obj);
  }

  public onCancelSelect() {
    this.showSelect = false;
  }

  public removeAssignedWord(word: WordModel) {
    var index = this.assignedWords.findIndex(w => w.id === word.id);
    this.assignedWords.splice(index, 1);
  }
};





