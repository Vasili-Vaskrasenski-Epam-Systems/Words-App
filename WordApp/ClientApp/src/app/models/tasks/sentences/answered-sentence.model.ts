import { SentenceModel } from './../../sentences/sentence.model';
import { TaskAnswerModel } from './../../../tasks/models/task-answer.model';

export class AnsweredSentenceModel {
  sentence: SentenceModel;
  answer: TaskAnswerModel;

  constructor(sentence: SentenceModel, answer: TaskAnswerModel) {
    this.sentence = sentence;
    this.answer = answer;
  }
}
