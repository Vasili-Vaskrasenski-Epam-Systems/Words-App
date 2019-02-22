import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: "app-word-editor-form",
  templateUrl: "./word-editor-form.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorFormComponent {

  @Input() word: WordModel;
  @Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutCreate: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  //onEdit(): void {
  //  this.notifyAboutEdit.emit(this.word);
  //}

  //onDelete(): void {
  //  this.notifyAboutDelete.emit(this.word);
  //}
}
