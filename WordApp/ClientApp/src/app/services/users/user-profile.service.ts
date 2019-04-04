import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from './../../models/users/user.model';

@Injectable()
export class UserProfileService {
  private baseUrl: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/User';
  }

  public getUserProfile(userId: string): any {
    var params = new HttpParams({ fromObject: { userId: userId} });
    var url = this.baseUrl + '/GetUserProfile';
    return this.http.get<UserModel[]>(url, { params: params });
  }
}
