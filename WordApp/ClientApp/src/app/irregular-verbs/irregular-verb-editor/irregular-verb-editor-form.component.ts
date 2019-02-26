import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { WordModel } from "./../../words/word.model";
import { IrregularVerbModel } from "./../irregular-verb.model";

@Component({
  selector: 'app-irregular-verb-editor-form',
  templateUrl: './irregular-verb-editor-form.component.html',
})

export class IrregularVerbEditorFormComponent implements OnInit
{
  private irregularVerbObject: IrregularVerbModel;
  private firstForm: WordModel;
  private secondForm: WordModel;
  private thirdForm: WordModel;

  @Input() existingWords: Array<WordModel>;
  @Output() notifyAboutConfirm: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor() {
    this.irregularVerbObject = new IrregularVerbModel(null, new Array<WordModel>(), "00000000-0000-0000-0000-000000000000", null);
  }

  ngOnInit(): void {
    this.firstForm = this.existingWords[0];
    this.secondForm = this.existingWords[0];
    this.thirdForm = this.existingWords[0];
  }

  private onConfirm() {
    this.irregularVerbObject.words = [ this.firstForm, this.secondForm, this.thirdForm ];
    this.notifyAboutConfirm.emit(this.irregularVerbObject);
  }

  private onCancel() {
    this.notifyAboutCancel.emit();
  }
};



