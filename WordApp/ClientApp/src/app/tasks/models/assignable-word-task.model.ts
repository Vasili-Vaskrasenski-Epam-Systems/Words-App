import { UserModel } from './../../users/user.model';
import { WordTaskModel } from './word-task.model';
import { Enums } from './../../app-enums';

export class AssignableWordTaskModel {
  taskStatus: Enums.ETaskStatus;
  deadline: Date;
  user: UserModel;
  wordTask: WordTaskModel;
  id: string;
  rowVersion: string;

  constructor(wordTask: WordTaskModel, user: UserModel, taskStatus : Enums.ETaskStatus, deadline: Date, id: string, rowVersion: string) {
    this.wordTask = wordTask;
    this.user = user;
    this.taskStatus = taskStatus ? taskStatus : Enums.ETaskStatus.Open;
    this.deadline = deadline;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}

