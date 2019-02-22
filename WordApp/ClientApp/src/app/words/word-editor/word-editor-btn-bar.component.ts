import { Component, EventEmitter, Output, Input } from '@angular/core';
import { WordModel } from './../word.model';

@Component({
  selector: "app-word-editor-btn-bar",
  templateUrl: "./word-editor-btn-bar.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorBtnBarComponent {

  @Input() word: WordModel;
  @Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutDelete: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  onEdit(): void {
    this.notifyAboutEdit.emit(this.word);
  }

  onDelete(): void {
    this.notifyAboutDelete.emit(this.word);
  }
}
