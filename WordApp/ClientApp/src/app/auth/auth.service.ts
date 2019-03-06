import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from './../users/user.model';

@Injectable({ providedIn: 'root' })

export class AuthService {
  public currentUser: UserModel;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/User';
  }

  public login(userName: string, password: string): any {
    var params = new HttpParams({
      fromObject: {
        userName: userName,
        password: password
      }
    });
    //params.append("userName", userName);
    //params.append("password", password);

    console.log(params);
    return this.http.post<any>(this.baseUrl + '/Login', null, {params: params})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          //this.currentUserSubject.next(user);
        }

        return user;
      }));
  }
}
