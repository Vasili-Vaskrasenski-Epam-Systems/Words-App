import { UserModel } from './../../models/users/user.model';
import { WordTaskModel } from './word-task.model';
import { Enums } from './../../app-enums';
import { AnsweredWordModel } from './answered-word.model';

export class AssignableWordTaskModel {
  taskStatus: Enums.ETaskStatus;
  deadline: Date;
  completeDate: Date;
  user: UserModel;
  wordTask: WordTaskModel;
  answeredWords: Array<AnsweredWordModel>;
  id: string;
  rowVersion: string;

  constructor(wordTask: WordTaskModel, user: UserModel, taskStatus : Enums.ETaskStatus, deadline: Date, completeDate: Date, answers: Array<AnsweredWordModel>, id: string, rowVersion: string) {
    this.wordTask = wordTask;
    this.user = user;
    this.taskStatus = taskStatus ? taskStatus : Enums.ETaskStatus.Open;
    this.deadline = deadline;
    this.answeredWords = answers;
    this.completeDate = completeDate;
    this.id = id;
    this.rowVersion = rowVersion;

  }
}

