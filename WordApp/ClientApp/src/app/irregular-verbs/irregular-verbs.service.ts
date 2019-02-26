import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IrregularVerbModel } from './irregular-verb.model';

@Injectable()
export class IrregularVerbsService {

  private baseUrl: string;

  public getIrregularVerbs(): any {
    var url = this.baseUrl + 'api/IrregularVerbs/GetIrregularVerbs';
    return this.http.get<IrregularVerbModel[]>(url);
  }

  public createIrregularVerb(verbModel: IrregularVerbModel): any {
    var url = this.baseUrl + 'api/IrregularVerbs/CreateIrregularVerb';
    return this.http.post<IrregularVerbModel>(url, verbModel);
  }

  //public createWord(wordEntity: IrregularVerbModel): any {
  //  var url = this.baseUrl + 'api/Words/CreateWord';
  //  return this.http.post<IrregularVerbModel>(url, wordEntity);
  //}

  //public updateWord(word: IrregularVerbModel): any {
  //  var url = this.baseUrl + 'api/Words/UpdateWord';
  //  return this.http.post<IrregularVerbModel>(url, word);
  //}

  //public deleteWord(word: IrregularVerbModel): any {
  //  //var url = this.baseUrl + 'api/Words/DeleteWord';
  //  //return this.http.post<string>(url, word);
  //}

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    console.log('verbs-service-created');
  }
};
