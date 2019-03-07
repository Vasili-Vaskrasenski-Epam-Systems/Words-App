import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WordModel } from './../word.model';

@Component({
  selector: "app-word-editor",
  templateUrl: "./word-editor.component.html",
})

export class WordEditorComponent {

  @Input() wordObject: WordModel;
  @Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutDelete: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  onWordEdit(): void {
    this.notifyAboutEdit.emit(this.wordObject);
  }

  onWordDelete(): void {
    this.notifyAboutDelete.emit(this.wordObject);
  }
}
