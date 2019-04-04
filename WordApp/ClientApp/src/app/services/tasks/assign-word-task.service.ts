import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './../../auth/auth.service';
import { AssignWordTaskModel } from './../../models/tasks/words/assign-word-task.model';


@Injectable()
export class AssignWordTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/AssignWordTask';
  }

  public assignTask(models: Array<AssignWordTaskModel>) {
    var url = this.baseUrl + '/AssignWordTasks';
    return this.http.post<string>(url, models);
  }

  public unassignWordTask(model: AssignWordTaskModel) {
    var url = this.baseUrl + '/UnassignWordTask';
    return this.http.post<AssignWordTaskModel>(url, model);
  }

  public getPupilTasks(userId: string) {
    var params = new HttpParams({ fromObject: { userId: userId } });
    var url = this.baseUrl + '/GetPupilTasks';
    return this.http.get<any>(url, { params: params});
  }

  public getPupilTask(userId: string, assignedTaskId: string) {
    var params = new HttpParams({ fromObject: { userId: userId, assignedTaskId: assignedTaskId } });
    var url = this.baseUrl + '/GetPupilTask';
    return this.http.get<any>(url, { params: params });
  }

  public completeWordTask(model: AssignWordTaskModel) {
    var url = this.baseUrl + '/CompleteWordTask';
    return this.http.post<AssignWordTaskModel>(url, model);
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params });
  }
}
