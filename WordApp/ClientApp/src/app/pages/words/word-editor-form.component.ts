import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordModel } from './../../models/words/word.model';
import { Constants } from './../../app-constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: "app-word-editor-form",
  templateUrl: "./word-editor-form.component.html",
})

export class WordEditorFormComponent implements OnInit {
  public wordEditorForm: FormGroup;
  private editableWord: WordModel;
  public submitted = false;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WordEditorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data) {
      this.editableWord = this.data;
    }

    this.wordEditorForm = this.formBuilder.group({
      word: [this.editableWord ? this.editableWord.word : '', Validators.required],
      transcription: [this.editableWord ? this.editableWord.transcription : '', Validators.required],
      translation: [this.editableWord ? this.editableWord.translation : '', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.wordEditorForm.invalid) {
      return;
    } else {
      var wordObject = new WordModel(this.wordEditorForm.controls.word.value,
        this.wordEditorForm.controls.transcription.value,
        this.wordEditorForm.controls.translation.value,
        this.editableWord ? this.editableWord.id : Constants.guidEmpty,
        this.editableWord ? this.editableWord.rowVersion : null);
      this.dialogRef.close(wordObject);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}


