export class SentenceTranslationModel {
  translation: string;
  id: string;
  rowVersion: string;

  constructor(translation: string, id: string, rowVersion: string) {
    this.translation = translation;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
