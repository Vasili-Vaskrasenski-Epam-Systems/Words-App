import { WordModel } from './../../words/word.model';

export class WordTaskModel {
  name: string;
  words: Array<WordModel>;
  id: string;
  rowVersion: string;

  constructor(name: string, words: Array<WordModel>, id: string, rowVersion: string) {
    this.name = name;
    this.words = words;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
