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

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
};
