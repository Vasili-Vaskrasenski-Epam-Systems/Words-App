import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserRegistrationModel } from './../models/users/user-registration.model';
import { UserLoginModel } from './../models/users/user-login.model';
import { Constants } from './../app-constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserLoginModel>;
  public currentUser: Observable<UserLoginModel>;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Authentication';
    this.currentUserSubject = new BehaviorSubject<UserLoginModel>(JSON.parse(sessionStorage.getItem(Constants.currentUser)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserLoginModel {
    return this.currentUserSubject.value;
  }

  public login(userName: string, password: string) {

    var params = new HttpParams({ fromObject: { userName: userName, password: password } });

    return this.http.post<any>(this.baseUrl + '/Login', null, { params: params })
      .pipe(map(user => {
        if (user) {
          var typedUser = <UserLoginModel>user;
          this.setCurrentUser(typedUser);
        }
        return user;
      }));
  }

  public register(user: UserRegistrationModel) {
    var url = this.baseUrl + '/Register';
    return this.http.post<string>(url, user);
  }

  public logout(): any {
    sessionStorage.removeItem(Constants.currentUser);
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  public setCurrentUser(userModel: UserLoginModel) {
    sessionStorage.setItem(Constants.currentUser, JSON.stringify(userModel));
    this.currentUserSubject.next(userModel);
  }
}

