import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { AssignVerbTaskModel } from './../../models/tasks/verbs/assign-verb-task.model';

@Injectable()
export class AssignVerbTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService  ) {
    this.baseUrl = baseUrl + 'api/AssignVerbTask';
  }

  public assignTask(models: Array<AssignVerbTaskModel>) {
    var url = this.baseUrl + '/AssignVerbsToTask';
    return this.http.post<string>(url, models, {headers: this.authService.getAuthenticationHeaders()});
  }

  public unassignTask(model: AssignVerbTaskModel) {
    var url = this.baseUrl + '/UnassignTask';
    return this.http.post<AssignVerbTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getPupilTasks(userId: string) {
    var params = new HttpParams({ fromObject: { userId: userId } });
    var url = this.baseUrl + '/GetPupilTasks';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }

  public getPupilTask(userId: string, assignedTaskId: string) {
    var params = new HttpParams({ fromObject: { userId: userId, assignedTaskId: assignedTaskId} });
    var url = this.baseUrl + '/GetPupilTask';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }

  public completeWordTask(model: AssignVerbTaskModel) {
    var url = this.baseUrl + '/CompleteVerbTask';
    return this.http.post<AssignVerbTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }
}
