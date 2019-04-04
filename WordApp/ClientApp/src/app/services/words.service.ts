import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordModel } from './../models/words/word.model';

@Injectable()
export class WordsService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Word';
  }

  public getWords(): any {
    var url = this.baseUrl + '/GetWords';
    return this.http.get<WordModel[]>(url);
  }

  public createWord(wordEntity: WordModel): any {
    var url = this.baseUrl + '/CreateWord';
    return this.http.post<WordModel>(url, wordEntity);
  }

  public updateWord(word: WordModel): any {
    var url = this.baseUrl + '/UpdateWord';
    return this.http.post<WordModel>(url, word);
  }

  public deleteWord(word: WordModel): any {
    var url = this.baseUrl + '/DeleteWord';
    return this.http.post<string>(url, word);
  }
};
