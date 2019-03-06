import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserModel } from './users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser : UserModel;

  constructor(authSvc: AuthService) {
    authSvc.currentUser.subscribe(e => this.currentUser = e);
  }
}
