export class WordModel {
  word: string;
  transcription: string;
  translation: string;

  constructor(word: string, transcription: string, translation: string) {
    this.word = word;
    this.transcription = transcription;
    this.translation = translation;
  }
};
