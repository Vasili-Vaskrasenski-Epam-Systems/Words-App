import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordModel } from './../models/words/word.model';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class WordsService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/Word';
  }

  public getWords(): any {
    var url = this.baseUrl + '/GetWords';
    return this.http.get<WordModel[]>(url, { headers: this.authService.getAuthenticationHeaders() });
  }

  public createWord(wordEntity: WordModel): any {
    var url = this.baseUrl + '/CreateWord';
    return this.http.post<WordModel>(url, wordEntity, { headers: this.authService.getAuthenticationHeaders() });
  }

  public updateWord(word: WordModel): any {
    var url = this.baseUrl + '/UpdateWord';
    return this.http.post<WordModel>(url, word, { headers: this.authService.getAuthenticationHeaders() });
  }

  public deleteWord(word: WordModel): any {
    var url = this.baseUrl + '/DeleteWord';
    return this.http.post<string>(url, word, { headers: this.authService.getAuthenticationHeaders() });
  }
};
