import { OrderedSentenceTaskModel } from './ordered-sentence-task.model';

export class SentenceTaskModel {
  name: string;
  sentences: Array<OrderedSentenceTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, sentences: Array<OrderedSentenceTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.sentences = sentences;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
