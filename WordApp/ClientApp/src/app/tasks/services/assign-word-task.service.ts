import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';
//import { AnsweredWordTaskModel } from './../models/answered-word-task.model';

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

  public unassignWordTask(model: AssignableWordTaskModel) {
    var url = this.baseUrl + '/UnassignWordTask';
    return this.http.post<AssignableWordTaskModel>(url, model);
  }

  public getPupilTasks(id: string) {
    var params = new HttpParams({ fromObject: { userId: id } });
    var url = this.baseUrl + '/GetPupilTasks';
    return this.http.get<any>(url, { params: params });
  }

  public completeWordTask(model: AssignableWordTaskModel) {
    var url = this.baseUrl + '/CompleteWordTask';
    return this.http.post<AssignableWordTaskModel>(url, model);
  }

}
