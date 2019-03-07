import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from './../users/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/User';
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
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
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(typedUser);
        }

        return user;
      }));
  }

  public register(user: UserModel) {
    return this.http.post(this.baseUrl + '/Register', user);
  }

  public logout(): any {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentUser = null;
  }
}

