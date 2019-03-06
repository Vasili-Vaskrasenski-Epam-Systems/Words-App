export class WordModel  {
  id: string;
  word: string;
  transcription: string;
  translation: string;
  rowVersion: string;

  constructor(word: string, transcription: string, translation: string, id: string, rowVersion: string) {
    this.word = word;
    this.transcription = transcription;
    this.translation = translation;
    this.id = id;
    this.rowVersion = rowVersion;
  }
};
