import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WordModel } from "./../../models/words/word.model";
import { VerbModel } from "./../../models/verbs/verb.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from './../../app-constants';

@Component({
  selector: 'verb-editor-form',
  templateUrl: './verb-editor-form.component.html',
})

export class VerbEditorFormComponent implements OnInit {
  public verbEditorForm: FormGroup;
  private editableVerb: VerbModel;
  public submitted = false;
  existingWords: Array<WordModel>;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<VerbEditorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.existingWords = this.data.words;

    if (this.data.verb) {
      this.editableVerb = this.data.verb;
    }

    this.verbEditorForm = this.formBuilder.group({
      commonWord: [this.editableVerb ? this.editableVerb.commonWord : '', Validators.required],
      firstForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[0].id) : this.existingWords[0], Validators.required],
      secondForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[1].id) : this.existingWords[0], Validators.required],
      thirdForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[2].id) : this.existingWords[0], Validators.required],
    });
    
  }

  public onSubmit(): void {
    this.submitted = true;
    
    if (this.verbEditorForm.invalid) {
      return;
    }
    else {
      var wordsArray = <Array<WordModel>>[this.verbEditorForm.controls.firstForm.value, this.verbEditorForm.controls.secondForm.value, this.verbEditorForm.controls.thirdForm.value];
      var model = new VerbModel(
        this.verbEditorForm.controls.commonWord.value,
        wordsArray,
        this.editableVerb ? this.editableVerb.id : Constants.guidEmpty,
        this.editableVerb ? this.editableVerb.rowVersion : null);
      this.dialogRef.close(model);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
};



