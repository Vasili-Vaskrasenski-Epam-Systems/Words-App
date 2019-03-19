import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VerbModel } from './verb.model';

@Injectable()
export class VerbService {

  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Verb';
  }

  public getVerbs(): any {
    var url = this.baseUrl + '/GetVerbs';
    return this.http.get<VerbModel[]>(url);
  }

  public createVerb(verbModel: VerbModel): any {
    var url = this.baseUrl + '/CreateVerb';
    return this.http.post<VerbModel>(url, verbModel);
  }

  public updateVerb(verbModel: VerbModel): any {
    console.log('svc', verbModel);
    var url = this.baseUrl + '/UpdateVerb';
    return this.http.post<VerbModel>(url, verbModel);
  }

  public deleteVerb(verbModel: VerbModel): any {
    var url = this.baseUrl + '/DeleteVerb';
    return this.http.post<string>(url, verbModel);
  }
};
