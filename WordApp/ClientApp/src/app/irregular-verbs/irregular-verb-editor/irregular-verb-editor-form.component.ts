import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { WordModel } from "./../../words/word.model";
import { IrregularVerbModel } from "./../irregular-verb.model";

@Component({
  selector: 'app-irregular-verb-editor-form',
  templateUrl: './irregular-verb-editor-form.component.html',
})

export class IrregularVerbEditorFormComponent implements OnInit {
  public irregularVerbObject: IrregularVerbModel;
  public firstForm: WordModel;
  public secondForm: WordModel;
  public thirdForm: WordModel;

  @Input() existingWords: Array<WordModel>;
  @Output() notifyAboutConfirm: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();
  @Output() notifyAboutCancel = new EventEmitter();

  constructor() {
    this.irregularVerbObject = new IrregularVerbModel(null, new Array<WordModel>(), "00000000-0000-0000-0000-000000000000", null);
  }

  ngOnInit(): void {
    if (this.existingWords && !this.irregularVerbObject) {
      this.firstForm = this.existingWords[0];
      this.secondForm = this.existingWords[0];
      this.thirdForm = this.existingWords[0];
    }
  }

  setVerbs(verb: IrregularVerbModel) {
    this.irregularVerbObject = new IrregularVerbModel(verb.commonWord, verb.words, verb.id, verb.rowVersion);
    this.firstForm = this.existingWords.find(e => e.id === this.irregularVerbObject.words[0].id);
    this.secondForm = this.existingWords.find(e => e.id === this.irregularVerbObject.words[1].id);;
    this.thirdForm = this.existingWords.find(e => e.id === this.irregularVerbObject.words[2].id);;
  }

  public onConfirm() : void {
    this.irregularVerbObject.words = [this.firstForm, this.secondForm, this.thirdForm];
    this.notifyAboutConfirm.emit(this.irregularVerbObject);
  }

  public onCancel(): void {
    this.notifyAboutCancel.emit();
  }

  public setSelectValue(wordId: string, model: WordModel) {
    var elementToSelect = this.existingWords.find(e => e.id === wordId);
    model = elementToSelect;
  }
};



