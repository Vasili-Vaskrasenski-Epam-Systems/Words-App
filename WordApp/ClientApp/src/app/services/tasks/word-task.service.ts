import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WordTaskModel } from './../../models/tasks/words/word-task.model';
import { WordTaskDetailModel } from './../../models/tasks/words/word-task-detail.model';
import { AuthService } from './../../auth/auth.service';

@Injectable()
export class WordTaskService {
  private baseUrl: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/WordTask';
  }

  public getTasks(): any {
    var url = this.baseUrl + '/GetWordTasks';
    return this.http.get<WordTaskModel[]>(url, { headers: this.authService.getAuthenticationHeaders() });
  }

  public createTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/CreateWordTask';
    return this.http.post<string>(url, task, { headers: this.authService.getAuthenticationHeaders() });
  }

  public updateTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/UpdateWordTask';
    return this.http.post<string>(url, task, { headers: this.authService.getAuthenticationHeaders() });
  }

  public deleteTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/DeleteWordTask';
    return this.http.post<string>(url, task, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getTaskDetails(id: string): any {
    var params = new HttpParams({ fromObject: { taskId: id} });
    var url = this.baseUrl + '/GetTaskDetails';
    return this.http.get<WordTaskDetailModel>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }
}
