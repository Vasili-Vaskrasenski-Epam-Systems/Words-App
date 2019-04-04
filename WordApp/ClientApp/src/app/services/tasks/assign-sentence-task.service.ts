import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssignSentenceTaskModel } from './../../models/tasks/sentences/assign-sentence-task.model';

@Injectable()
export class AssignSentenceTaskService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/AssignSentenceTask';
  }

  public assignSentenceTasks(models: AssignSentenceTaskModel[]) {
    var url = this.baseUrl + '/AssignSentenceTasks';
    return this.http.post<string>(url, models);
  }

  public unassignSentenceTask(model: AssignSentenceTaskModel) {
    var url = this.baseUrl + '/UnassignSentenceTask';
    return this.http.post<AssignSentenceTaskModel>(url, model);
  }

  public getPupilTasks(userId: string) {
    var params = new HttpParams({ fromObject: { userId: userId } });
    var url = this.baseUrl + '/GetPupilTasks';
    return this.http.get<any>(url, { params: params });
  }

  public getPupilTask(userId: string, assignedTaskId: string) {
    var params = new HttpParams({ fromObject: { userId: userId, assignedTaskId: assignedTaskId } });
    var url = this.baseUrl + '/GetPupilTask';
    return this.http.get<any>(url, { params: params });
  }

  public completeSentenceTask(model: AssignSentenceTaskModel) {
    var url = this.baseUrl + '/CompleteSentenceTask';
    return this.http.post<AssignSentenceTaskModel>(url, model);
  }

  public getCompletedTask(taskId: string) {
    var params = new HttpParams({ fromObject: { taskId: taskId } });
    var url = this.baseUrl + '/GetCompletedTask';
    return this.http.get<any>(url, { params: params});
  }
}

