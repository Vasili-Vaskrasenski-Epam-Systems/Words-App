import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssignableVerbTaskModel } from './../models/assignable-verb-task.model';

@Injectable()
export class AssignVerbTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/AssignVerbTask';
  }

  public assignTask(models: Array<AssignableVerbTaskModel>) {
    var url = this.baseUrl + '/AssignVerbsToTask';
    return this.http.post<string>(url, models);
  }

  public unassignWordTask(model: AssignableVerbTaskModel) {
    var url = this.baseUrl + '/UnassignVerbTask';
    return this.http.post<AssignableVerbTaskModel>(url, model);
  }

  public completeWordTask(model: AssignableVerbTaskModel) {
    var url = this.baseUrl + '/CompleteVerbTask';
    return this.http.post<AssignableVerbTaskModel>(url, model);
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params });
  }
}
