import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from './../models/users/user.model';
import { UserTokenModel } from './../models/users/user-token.model';
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

  public login(userName: string, password: string) {

    var params = new HttpParams({ fromObject: { userName: userName, password: password } });

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

  public loginViaGoogle() {
    const form = window.document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", this.baseUrl + '/LoginWithGoogle');
    //use _self to redirect in same tab, _blank to open in new tab
    form.setAttribute("target", "_blank");

    //Add all the data to be posted as Hidden elements

    window.document.body.appendChild(form);
    form.submit();
  }

    //var params = new HttpParams({ fromObject: { } });
    //return this.http.post<any>(this.baseUrl + '/LoginWithGoogle', null, {params: params})
    //  .pipe(map(user => {
    //    if (user) {
    //      var typedUser = <UserModel>user;
    //      //sessionStorage.setItem(Constants.currentUser, JSON.stringify(user));
    //      //this.currentUserSubject.next(typedUser);
    //    }
    //    return user;
    //  }));
  //}

  public updateUserToken(token: UserTokenModel) {
    var user = this.currentUserValue;
    user.token = token;
    sessionStorage.setItem(Constants.currentUser, JSON.stringify(user));
    this.currentUserSubject.next(user);
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

  public getAuthenticationHeaders(): HttpHeaders {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + this.currentUserValue.token.accessToken
    });
    return headers;
  }
}

