import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IrregularVerbModel } from './irregular-verb.model';

@Injectable()
export class IrregularVerbsService {

  private baseUrl: string;

  public getIrregularVerbs(): any {
    var url = this.baseUrl + '/GetIrregularVerbs';
    return this.http.get<IrregularVerbModel[]>(url);
  }

  public createIrregularVerb(verbModel: IrregularVerbModel): any {
    var url = this.baseUrl + '/CreateIrregularVerb';
    return this.http.post<IrregularVerbModel>(url, verbModel);
  }

  public updateIrregularVerb(verbModel: IrregularVerbModel): any {
    var url = this.baseUrl + '/UpdateIrregularVerb';
    return this.http.post<IrregularVerbModel>(url, verbModel);
  }

  public deleteIrregularVerb(verbModel: IrregularVerbModel): any {
    var url = this.baseUrl + '/DeleteIrregularVerb';
    return this.http.post<string>(url, verbModel);
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/IrregularVerb';
  }
};
