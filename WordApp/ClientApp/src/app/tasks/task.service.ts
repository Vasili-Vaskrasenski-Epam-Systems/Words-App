import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
  private baseUrl: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Task';
  }

  public getTasks(): any {
    var url = this.baseUrl + '/GetTasks';
    return this.http.get<TaskModel[]>(url);
  }

  public createTask(task: TaskModel): any {
    var url = this.baseUrl + '/CreateTask';
    return this.http.post<string>(url, task);
  }

  public updateTask(task: TaskModel): any {
    var url = this.baseUrl + '/UpdateTask';
    return this.http.post<string>(url, task);
  }

  public deleteTask(task: TaskModel): any {
    var url = this.baseUrl + '/DeleteTask';
    return this.http.post<string>(url, task);
  }
}
