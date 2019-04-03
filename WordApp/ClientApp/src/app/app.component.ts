import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserTokenService } from './services/users/user-token.service';
import { UserLoginModel } from './models/users/user-login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: UserLoginModel;

  constructor(private authSvc: AuthService, private userTokenService: UserTokenService) {
    this.authSvc.currentUser.subscribe(e => {
      this.currentUser = e;
      console.log(e);
      //if (e) {
      //  this.userTokenService.handleTokenExpiration();
      //}
    });
  }
}
