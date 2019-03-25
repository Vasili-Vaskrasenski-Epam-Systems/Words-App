import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SentenceModel } from './../models/sentence.model';
import { AuthService } from './../auth/auth.service';

@Injectable() export class SentenceService {

  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/Sentence';
  }

  public getSentences(): any {
    var url = this.baseUrl + '/GetSentences';
    return this.http.get<SentenceModel[]>(url, {headers: this.authService.getAuthenticationHeaders()});
  }

  public createSentence(sentenceModel: SentenceModel): any {
    var url = this.baseUrl + '/CreateSentence';
    return this.http.post<SentenceModel>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }

  public updateSentence(sentenceModel: SentenceModel): any {
    var url = this.baseUrl + '/UpdateSentence';
    return this.http.post<SentenceModel>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }

  public deleteSentence(sentenceModel: SentenceModel): any {
    var url = this.baseUrl + '/DeleteSentence';
    return this.http.post<string>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }
};
