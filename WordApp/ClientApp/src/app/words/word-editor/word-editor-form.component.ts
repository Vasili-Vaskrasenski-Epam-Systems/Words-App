import { Component, EventEmitter, Output, Input } from '@angular/core';
import { WordModel } from './../word.model';

@Component({
  selector: "app-word-editor-form",
  templateUrl: "./word-editor-form.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorFormComponent  {

  //private isCreateMode: boolean;

  //@Input() word: WordModel;
  //@Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutCreate: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  onAddWord(newWord: {
    word: string;
    transcription: string;
    translation: string;
  }): void {
    const word = new WordModel(newWord.word, newWord.transcription, newWord.translation, null, null);

    this.notifyAboutCreate.emit(word);
  }
  //onDelete(): void {
  //  this.notifyAboutDelete.emit(this.word);
  //}
}
