import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserLoginModel } from './models/users/user-login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: UserLoginModel;

  constructor(private authSvc: AuthService) {
    this.authSvc.currentUser.subscribe(e => {
      this.currentUser = e;
    });
  }
}
