import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from './../users/user.model';
import { Constants } from './../app-constants';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Authentication';
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(sessionStorage.getItem(Constants.currentUser)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public login(userName: string, password: string){

    var params = new HttpParams({fromObject: {userName: userName, password: password}});

    return this.http.post<any>(this.baseUrl + '/Login', null, { params: params })
      .pipe(map(user => {
        if (user) {
          var typedUser = <UserModel>user;
          sessionStorage.setItem(Constants.currentUser, JSON.stringify(user));
          this.currentUserSubject.next(typedUser);
        }

        return user;
      }));
  }

  public register(user: UserModel) {
    var url = this.baseUrl + '/RegisterUser';
    return this.http.post<string>(url, user);
  }

  public logout(): any {
    sessionStorage.removeItem(Constants.currentUser);
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }

  public getAuthenticationHeaders() : HttpHeaders {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+ ' ' + this.currentUserValue.token
    });
    return headers;
  }
}

