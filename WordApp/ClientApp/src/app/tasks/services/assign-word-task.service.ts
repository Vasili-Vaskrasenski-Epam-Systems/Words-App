import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';


@Injectable()
export class AssignWordTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/AssignTask';
  }

  public assignTask(models: Array<AssignableWordTaskModel>) {
    var url = this.baseUrl + '/AssignWordTasks';
    return this.http.post<string>(url, models);
  }
}
