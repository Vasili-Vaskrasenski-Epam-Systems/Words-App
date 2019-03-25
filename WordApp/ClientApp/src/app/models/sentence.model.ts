import { SentenceTranslationModel } from './sentence-translation.model';

export class SentenceModel {
  text: string;
  translations: Array<SentenceTranslationModel>;
  id: string;
  rowVersion: string;

  constructor(text: string, translations: Array<SentenceTranslationModel>, id: string, rowVersion: string) {
    this.text = text;
    this.translations = translations;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
