import { VerbModel } from './../../verbs/verb.model';
import { VerbTaskAnswerModel } from './verb-task-answer.model';

export class AnsweredVerbModel {
  verb: VerbModel;
  answer: VerbTaskAnswerModel;

  constructor(verb: VerbModel, answer: VerbTaskAnswerModel) {
    this.verb = verb;
    this.answer = answer;
  }
}

