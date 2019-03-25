import { SentenceModel } from './../../sentences/sentence.model';

export class OrderedSentenceTaskModel {
  order: number;
  sentence: SentenceModel;
  id: string;
  rowVersion: string;

  constructor(order: number, sentence: SentenceModel, id: string, rowVersion: string) {
    this.id = id;
    this.rowVersion = rowVersion;
    this.order = order;
    this.sentence = sentence;
  }
}


