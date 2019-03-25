import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { AssignSentenceTaskModel } from './../../models/tasks/sentences/assign-sentence-task.model';

@Injectable()
export class AssignSentenceTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/AssignSentenceTask';
  }

  public assignSentenceTasks(models: Array<AssignSentenceTaskModel>) {
    var url = this.baseUrl + '/AssignSentenceTasks';
    return this.http.post<string>(url, models, { headers: this.authService.getAuthenticationHeaders() });
  }

  public unassignSentenceTask(model: AssignSentenceTaskModel) {
    var url = this.baseUrl + '/UnassignSentenceTask';
    return this.http.post<AssignSentenceTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
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

  public completeSentenceTask(model: AssignSentenceTaskModel) {
    var url = this.baseUrl + '/CompleteSentenceTask';
    return this.http.post<AssignSentenceTaskModel>(url, model, { headers: this.authService.getAuthenticationHeaders() });
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }
}

