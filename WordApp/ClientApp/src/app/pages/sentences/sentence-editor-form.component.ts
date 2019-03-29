import { Component, Output, EventEmitter, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SentenceModel } from "./../../models/sentences/sentence.model";
import { SentenceTranslationModel } from "./../../models/sentences/sentence-translation.model";
import { CommonDraggableListModel } from "./../../common/common-draggable-list.component";

import { AlertService } from './../../alert/alert.service';
import { Constants } from './../../app-constants';

@Component({
  selector: 'sentence-editor-form',
  templateUrl: './sentence-editor-form.component.html',
})

export class SentenceEditorFormComponent implements OnInit {
  public sentenceEditorForm: FormGroup;
  public assignedTranslations: Array<CommonDraggableListModel>;
  private editableObject: SentenceModel;
  public submitted = false;

  @Output() notifyAboutConfirm: EventEmitter<SentenceModel> = new EventEmitter<SentenceModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private alertService: AlertService, public dialogRef: MatDialogRef<SentenceEditorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.assignedTranslations = new Array<CommonDraggableListModel>();
  }

  ngOnInit(): void {
    if (this.data) {
      this.editableObject = this.data;
      this.assignedTranslations =
        this.editableObject.translations.map(t => new CommonDraggableListModel(0, t, t.translation));
    }

    this.sentenceEditorForm = this.formBuilder.group({
      text: [this.editableObject ? this.editableObject.text : '', Validators.required],
      translation: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.sentenceEditorForm.controls.text.invalid) {
      this.submitted = true;
      return;
    }
    if (this.assignedTranslations.length === 0) {
      this.alertService.error("At least one translations should be added to the sentence");
      return;
    }
    else {
      var model = new SentenceModel(
        this.sentenceEditorForm.controls.text.value,
        this.assignedTranslations.map(t => <SentenceTranslationModel>t.key),
        this.editableObject ? this.editableObject.id : Constants.guidEmpty,
        this.editableObject ? this.editableObject.rowVersion : null);
      this.dialogRef.close(model);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onAddTranslation() {
    this.submitted = true;
    if (this.sentenceEditorForm.controls.translation.invalid) {
      this.submitted = true;
      return;
    }
    else {
      var translation = new SentenceTranslationModel(this.sentenceEditorForm.controls.translation.value,
        Constants.guidEmpty,
        null);
      this.assignedTranslations.push(new CommonDraggableListModel(0, translation, translation.translation));
      this.submitted = false;
      this.sentenceEditorForm.controls.translation.setValue('');
    }
  }
};






