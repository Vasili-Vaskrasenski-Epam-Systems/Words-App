import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserTokenService } from './services/users/user-token.service';
import { UserModel } from './models/users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: UserModel;

  constructor(private authSvc: AuthService, private userTokenService: UserTokenService) {
    this.authSvc.currentUser.subscribe(e => {
      this.currentUser = e;

      if (e) {
        this.userTokenService.handleTokenExpiration();
      }
    });
  }
}
