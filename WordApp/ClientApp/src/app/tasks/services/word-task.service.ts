import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WordTaskModel } from './../models/word-task.model';
import { WordTaskDetailModel } from './../models/word-task-detail.model';

@Injectable()
export class WordTaskService {
  private baseUrl: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/WordTask';
  }

  public getTasks(): any {
    var url = this.baseUrl + '/GetWordTasks';
    return this.http.get<WordTaskModel[]>(url);
  }

  public createTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/CreateWordTask';
    return this.http.post<string>(url, task);
  }

  public updateTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/UpdateWordTask';
    return this.http.post<string>(url, task);
  }

  public deleteTask(task: WordTaskModel): any {
    var url = this.baseUrl + '/DeleteWordTask';
    return this.http.post<string>(url, task);
  }

  public getTaskDetails(id: string): any {
    var params = new HttpParams({ fromObject: { taskId: id} });
    var url = this.baseUrl + '/GetTaskDetails';
    return this.http.get<WordTaskDetailModel>(url, { params: params });
  }
}
