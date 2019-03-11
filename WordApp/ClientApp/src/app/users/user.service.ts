import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  private baseUrl: string;
  private  currentUser: UserModel;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/User';
  }
  
  public regiesterUser(word: UserModel): any {
    var url = this.baseUrl + '/RegisterUser';
    return this.http.post<string>(url, word);
  }

  public setCurrentUser(user: UserModel) {
    this.currentUser = user;
  }

  public getCurrentUser(): UserModel {
    return this.currentUser;
  }

  public getUsers(): any {
    var url = this.baseUrl + '/GetUsers';
    return this.http.get<UserModel[]>(url);
  }

  public createUser(word: UserModel): any {
    var url = this.baseUrl + '/CreateUser';
    return this.http.post<string>(url, word);
  }

  public updateUser(word: UserModel): any {
    var url = this.baseUrl + '/UpdateUser';
    return this.http.post<string>(url, word);
  }

  public deleteUser(word: UserModel): any {
    var url = this.baseUrl + '/DeleteUser';
    return this.http.post<string>(url, word);
  }
};
