import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VerbTaskModel } from './../../models/tasks/verbs/verb-task.model';
import { WordTaskDetailModel } from './../../models/tasks/words/word-task-detail.model';
import { AuthService } from './../../auth/auth.service';

@Injectable()
export class VerbTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/VerbTask';
  }

  public getTasks(): any {
    var url = this.baseUrl + '/GetVerbTasks';
    return this.http.get<VerbTaskModel[]>(url);
  }

  public createTask(task: VerbTaskModel): any {
    var url = this.baseUrl + '/CreateVerbTask';
    return this.http.post<string>(url, task);
  }

  public updateTask(task: VerbTaskModel): any {
    var url = this.baseUrl + '/UpdateVerbTask';
    return this.http.post<string>(url, task);
  }

  public deleteTask(task: VerbTaskModel): any {
    var url = this.baseUrl + '/DeleteVerbTask';
    return this.http.post<string>(url, task);
  }

  public getTaskDetails(id: string): any {
    var params = new HttpParams({ fromObject: { taskId: id } });
    var url = this.baseUrl + '/GetTaskDetails';
    return this.http.get<WordTaskDetailModel>(url, { params: params });
  }
}
