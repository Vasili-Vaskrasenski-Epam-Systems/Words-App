import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "app-word-editor-btn-bar",
  templateUrl: "./word-editor-btn-bar.component.html",
  inputs: ['word', 'transcription', 'translation']
})

export class WordEditorBtnBarComponent {
  @Output() notifyAboutEdit: EventEmitter<WordModel> = new EventEmitter<WordModel>();
  @Output() notifyAboutDelete: EventEmitter<WordModel> = new EventEmitter<WordModel>();

  onEdit(): void {
    this.notifyAboutEdit.emit(null);
  }

  onDelete(): void {
    this.notifyAboutDelete.emit(null);
  }

  //wordEditForm = new FormGroup({
  //  word: new FormControl(''),
  //  transcription: new FormControl(''),
  //  translation: new FormControl(''),
  //});

  

}
