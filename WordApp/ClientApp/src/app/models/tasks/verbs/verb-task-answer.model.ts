export class VerbTaskAnswerModel {
  firstForm: string;
  secondForm: string;
  thirdForm: string;
  id: string;
  rowVersion: string;

  constructor(firstForm: string, secondForm: string, thirdForm: string, id: string, rowVersion: string) {
    this.id = id;
    this.firstForm = firstForm;
    this.secondForm = secondForm;
    this.thirdForm = thirdForm;
    this.rowVersion = rowVersion;
  }
}

