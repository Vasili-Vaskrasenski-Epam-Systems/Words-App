import { UserModel } from './../../../users/user.model';
import { SentenceTaskModel } from './sentence-task.model';
import { Enums } from './../../../app-enums';
import { AnsweredSentenceModel } from './answered-sentence.model';

export class AssignSentenceTaskModel {
  taskStatus: Enums.ETaskStatus;
  deadline: Date;
  completeDate: Date;
  user: UserModel;
  sentenceTask: SentenceTaskModel;
  answeredSentences: Array<AnsweredSentenceModel>;
  id: string;
  rowVersion: string;

  constructor(sentenceTask: SentenceTaskModel, user: UserModel, taskStatus: Enums.ETaskStatus, deadline: Date,
    completeDate: Date, answers: Array<AnsweredSentenceModel>, id: string, rowVersion: string) {
    this.sentenceTask = sentenceTask;
    this.user = user;
    this.taskStatus = taskStatus ? taskStatus : Enums.ETaskStatus.Open;
    this.deadline = deadline;
    this.answeredSentences = answers;
    this.completeDate = completeDate;
    this.id = id;
    this.rowVersion = rowVersion;

  }
}
