import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordModel } from './word.model';

@Injectable()
export class WordsService {

  private baseUrl: string;

  public getWords(): any {
    var url = this.baseUrl + 'api/Words/GetWords';
    return this.http.get<WordModel[]>(url);
  }

  public createWord(wordEntity: WordModel): any {
    var url = this.baseUrl + 'api/Words/CreateWord';
    return this.http.post<WordModel>(url, wordEntity);
  }

  public updateWord(word: WordModel): any {
    var url = this.baseUrl + 'api/Words/UpdateWord';
    return this.http.post<WordModel>(url, word);
  }

  public deleteWord(word: WordModel): any {
    var url = this.baseUrl + 'api/Words/DeleteWord';
    return this.http.post<string>(url, word);
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    console.log('words-service-created');
  }
};
