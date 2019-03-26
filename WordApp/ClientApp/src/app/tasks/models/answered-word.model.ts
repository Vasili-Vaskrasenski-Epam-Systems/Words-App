import { WordModel } from './../../models/words/word.model';
import { TaskAnswerModel } from './task-answer.model';

export class AnsweredWordModel {
  word: WordModel;
  answer: TaskAnswerModel;

  constructor(word: WordModel, answer: TaskAnswerModel) {
    this.word = word;
    this.answer = answer;
  }
}
