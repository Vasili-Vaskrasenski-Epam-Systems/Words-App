import { WordModel } from './../words/word.model';

export class IrregularVerbModel {
  id: string;
  commonWord: string;
  rowVersion: string;
  words: Array<WordModel>;

  constructor(commonWord: string, words: Array<WordModel>, id: string, rowVersion: string) {
    this.commonWord = commonWord;
    this.words = words;
    this.id = id;
    this.rowVersion = rowVersion;
  }
};
