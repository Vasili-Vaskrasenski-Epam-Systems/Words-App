import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-word-editor",
  templateUrl: "./word-editor.html"
})

export class WordEditorComponent {
  wordEditForm = new FormGroup({
    word: new FormControl(''),
    transcription: new FormControl(''),
    translation: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.wordEditForm.value);
  }
}
