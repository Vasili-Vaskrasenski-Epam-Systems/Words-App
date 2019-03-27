import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Constants } from './../../app-constants';
import { AuthService } from './../../auth/auth.service';

import { UserTokenModel } from './../../models/users/user-token.model';

@Injectable()
export class UserTokenService implements OnDestroy {
  private intervalSet: boolean;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl + 'api/UserToken';
  }

  public handleTokenExpiration(): void {
    console.log(this.intervalSet);
    if (!this.intervalSet)
      setInterval(() => {
        this.intervalSet = true;
        var currentDate = new Date();
        var currentUtcDate = Date.UTC(currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          currentDate.getUTCHours(),
          currentDate.getUTCMinutes(),
          currentDate.getUTCSeconds());

        if (new Date(this.authService.currentUserValue.token.accessTokenExpirationDate).getTime() - currentUtcDate < Constants.accessTokenTimeToRefresh) {
          this.refreshToken(this.authService.currentUserValue.id, this.authService.currentUserValue.token.refreshToken)
            .subscribe(e => {
              this.authService.updateUserToken(e);
            });
        };
      },
        Constants.accessTokenCheckInterval);
  }

  public refreshToken(userId: string, refreshToken: string) {
    var params = new HttpParams({ fromObject: { userId: userId, refreshToken: refreshToken } });
    var url = this.baseUrl + '/RefreshToken';
    return this.http.post<UserTokenModel>(url, null, { params: params, headers: this.authService.getAuthenticationHeaders() });
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
