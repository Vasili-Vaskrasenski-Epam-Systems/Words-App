import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SentenceTaskModel } from './../../models/tasks/sentences/sentence-task.model';
import { SentenceTaskDetailModel } from './../../models/tasks/sentences/sentence-task-detail.model';

import { AuthService } from './../../auth/auth.service';

@Injectable() export class SentenceTaskService {

  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/SentenceTask';
  }

  public getSentenceTasks(): any {
    var url = this.baseUrl + '/GetSentenceTasks';
    return this.http.get<SentenceTaskModel[]>(url, {headers: this.authService.getAuthenticationHeaders()});
  }

  public createSentenceTask(sentenceModel: SentenceTaskModel): any {
    var url = this.baseUrl + '/CreateSentenceTask';
    return this.http.post<SentenceTaskModel>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }

  public updateSentenceTask(sentenceModel: SentenceTaskModel): any {
    var url = this.baseUrl + '/UpdateSentenceTask';
    return this.http.post<SentenceTaskModel>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }

  public deleteSentenceTask(sentenceModel: SentenceTaskModel): any {
    var url = this.baseUrl + '/DeleteSentenceTask';
    return this.http.post<string>(url, sentenceModel, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getTaskDetails(id: string): any {
    var params = new HttpParams({ fromObject: { taskId: id } });
    var url = this.baseUrl + '/GetTaskDetails';
    return this.http.get<SentenceTaskDetailModel>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }
};

