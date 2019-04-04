import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from './../../models/users/user.model';

@Injectable()
export class UserService {
  private baseUrl: string;
  private currentUser: UserModel;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/User';
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

  public getUsersByType(userType: string): any {
    var params = new HttpParams({ fromObject: { userType: userType } });
    var url = this.baseUrl + '/GetUsersByType';
    return this.http.get<UserModel[]>(url, { params: params });
  }

  public createUser(user: UserModel): any {
    var url = this.baseUrl + '/CreateUser';
    return this.http.post<string>(url, user);
  }

  public updateUser(user: UserModel): any {
    var url = this.baseUrl + '/UpdateUser';
    return this.http.post<string>(url, user);
  }

  public deleteUser(user: UserModel): any {
    var url = this.baseUrl + '/DeleteUser';
    return this.http.post<string>(url, user);
  }
};
