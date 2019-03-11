import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { WordModel } from "./../../words/word.model";
import { IrregularVerbModel } from "./../irregular-verb.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-irregular-verb-editor-form',
  templateUrl: './irregular-verb-editor-form.component.html',
})

export class IrregularVerbEditorFormComponent implements OnInit {
  public verbEditorForm: FormGroup;
  private editableVerb: IrregularVerbModel;
  submitted = false;

  existingWords: Array<WordModel>;
  @Output() notifyAboutConfirm: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('init');
    this.verbEditorForm = this.formBuilder.group({
      commonWord: [this.editableVerb ? this.editableVerb.commonWord : '', Validators.required],
      firstForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[0].id) : this.existingWords[0], Validators.required],
      secondForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[1].id) : this.existingWords[0], Validators.required],
      thirdForm: [this.editableVerb ? this.existingWords.find(w => w.id === this.editableVerb.words[2].id) : this.existingWords[0], Validators.required],
    });
    
  }

  get f() {
    return this.verbEditorForm.controls;
  }

  setVerbs(verb: IrregularVerbModel) {
    this.editableVerb = new IrregularVerbModel(verb.commonWord, verb.words, verb.id, verb.rowVersion);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.verbEditorForm.invalid) {
      return;
    }
    else {
      var wordsArray = <Array<WordModel>>[this.f.firstForm.value, this.f.secondForm.value, this.f.thirdForm.value];
      var model = new IrregularVerbModel(
        this.f.commonWord.value,
        wordsArray,
        this.editableVerb ? this.editableVerb.id : "00000000-0000-0000-0000-000000000000",
        this.editableVerb ? this.editableVerb.rowVersion : null);
      this.notifyAboutConfirm.emit(model);
    }
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }
};



