import { WordModel } from './../../../models/words/word.model';

export class OrderedWordTaskModel {
  order: number;
  word: WordModel;
  id: string;
  rowVersion: string;

  constructor(order: number, word: WordModel, id: string, rowVersion: string) {
    this.id = id;
    this.rowVersion = rowVersion;
    this.order = order;
    this.word = word;
  }
}

