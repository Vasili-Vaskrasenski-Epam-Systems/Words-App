import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { AssignableWordTaskModel } from './../models/assignable-word-task.model';


@Injectable()
export class AssignWordTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/AssignWordTask';
  }

  public assignTask(models: Array<AssignableWordTaskModel>) {
    var url = this.baseUrl + '/AssignWordTasks';
    return this.http.post<string>(url, models, { headers: this.authService.getAuthenticationHeaders() });
  }

  public unassignWordTask(model: AssignableWordTaskModel) {
    var url = this.baseUrl + '/UnassignWordTask';
    return this.http.post<AssignableWordTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getPupilTasks(userId: string) {
    var params = new HttpParams({ fromObject: { userId: userId } });
    var url = this.baseUrl + '/GetPupilTasks';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }

  public getPupilTask(userId: string, assignedTaskId: string) {
    var params = new HttpParams({ fromObject: { userId: userId, assignedTaskId: assignedTaskId } });
    var url = this.baseUrl + '/GetPupilTask';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }

  public completeWordTask(model: AssignableWordTaskModel) {
    var url = this.baseUrl + '/CompleteWordTask';
    return this.http.post<AssignableWordTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }
}
