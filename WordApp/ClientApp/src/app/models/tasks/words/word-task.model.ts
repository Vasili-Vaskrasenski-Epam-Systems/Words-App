import { OrderedWordTaskModel } from './ordered-word-task.model';

export class WordTaskModel {
  name: string;
  isTranslationTask: boolean;
  words: Array<OrderedWordTaskModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, isTranslationTask: boolean, words: Array<OrderedWordTaskModel>, id: string, rowVersion: string) {
    this.name = name;
    this.words = words;
    this.id = id;
    this.rowVersion = rowVersion;
    this.isTranslationTask = isTranslationTask;
  }
}
