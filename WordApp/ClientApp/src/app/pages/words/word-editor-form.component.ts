import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordModel } from './../../models/words/word.model';
import { Constants } from './../../app-constants';

@Component({
  selector: "app-word-editor-form",
  templateUrl: "./word-editor-form.component.html",
})

export class WordEditorFormComponent implements OnInit {
  public wordEditorForm: FormGroup;
  private editableWord: WordModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.wordEditorForm = this.formBuilder.group({
      word: [this.editableWord ? this.editableWord.word : '', Validators.required],
      transcription: [this.editableWord ? this.editableWord.transcription : '', Validators.required],
      translation: [this.editableWord ? this.editableWord.translation : '', Validators.required]
    });
  }

  get f() { return this.wordEditorForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.wordEditorForm.invalid) {
      return;
    } else {
      var wordObject = new WordModel(this.f.word.value,
        this.f.transcription.value,
        this.f.translation.value,
        this.editableWord ? this.editableWord.id : Constants.guidEmpty,
        this.editableWord ? this.editableWord.rowVersion : null);
      this.notifyAboutConfirm.emit(wordObject);
    }
  }

  onCancel() {
    this.notifyAboutCancel.emit();
  }

  setWord(word: WordModel) {
    this.editableWord = word;
  }
}


