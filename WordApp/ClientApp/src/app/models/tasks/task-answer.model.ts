export class TaskAnswerModel {
  answer: string;
  id: string;
  rowVersion: string;

  constructor(answer: string, id: string, rowVersion: string) {
    this.id = id;
    this.answer = answer;
    this.rowVersion = rowVersion;
  }
}
