import { WordModel } from './../../words/word.model';

export class OrderedWordTaskModel {
  order: number;
  isTranslation: boolean;
  word: WordModel;
  id: string;
  rowVersion: string;

  constructor(order: number, word: WordModel,isTranslation: boolean,  id: string, rowVersion: string) {
    this.id = id;
    this.rowVersion = rowVersion;
    this.order = order;
    this.isTranslation = isTranslation;
    this.word = word;
  }
}

