import { UserModel } from './../../users/user.model';
import { VerbTaskModel } from './verb-task.model';
import { ETaskStatus } from './../../../app-enums';
import { AnsweredVerbModel } from './answered-verb.model';

export class AssignVerbTaskModel {
  taskStatus: ETaskStatus;
  deadline: Date;
  completeDate: Date;
  user: UserModel;
  verbTask: VerbTaskModel;
  answeredVerbs: Array<AnsweredVerbModel>;
  id: string;
  rowVersion: string;

  constructor(verbTask: VerbTaskModel, user: UserModel, taskStatus : ETaskStatus, deadline: Date, completeDate: Date, answers: Array<AnsweredVerbModel>, id: string, rowVersion: string) {
    this.verbTask = verbTask;
    this.user = user;
    this.taskStatus = taskStatus ? taskStatus : ETaskStatus.Open;
    this.deadline = deadline;
    this.answeredVerbs = answers;
    this.completeDate = completeDate;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}


