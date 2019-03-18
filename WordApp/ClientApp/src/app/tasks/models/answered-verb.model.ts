import { VerbModel } from './../../verbs/verb.model';
import { TaskAnswerModel } from './task-answer.model';

export class AnsweredVerbModel {
  verb: VerbModel;
  answer: TaskAnswerModel;

  constructor(verb: VerbModel, answer: TaskAnswerModel) {
    this.verb = verb;
    this.answer = answer;
  }
}

