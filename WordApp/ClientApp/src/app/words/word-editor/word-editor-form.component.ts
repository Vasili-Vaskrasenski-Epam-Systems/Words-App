import { Component, EventEmitter, Output } from '@angular/core';
import { WordModel } from './../word.model';

@Component({
  selector: "app-word-editor-form",
  templateUrl: "./word-editor-form.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorFormComponent  {
  private wordObject: WordModel;
  @Output() notifyAboutConfirm: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor() {
    this.wordObject = new WordModel(null, null, null, "00000000-0000-0000-0000-000000000000", null);
  }

  setWord(word: WordModel) {
    this.wordObject = new WordModel(word.word, word.transcription, word.translation, word.id, word.rowVersion);
  }
  
  private onConfirm() {
    this.notifyAboutConfirm.emit(this.wordObject);
  }

  private onCancel(): void {
    this.notifyAboutCancel.emit();
  };
}


