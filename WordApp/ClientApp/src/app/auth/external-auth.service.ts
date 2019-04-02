import { Injectable } from "@angular/core";
import { AuthService as MyAuthService } from "./auth.service";
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Injectable()
export class ExternalAuthService {
  constructor(private authService: AuthService, private externalAuthService: MyAuthService, private router: Router) {

  }

  public loginWithGoogleAccount() {
    this.authService.signIn("google").then(userData => {
      this.externalAuthService.loginViaGoogle(userData.email, userData.id).subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        }
      });
    });
  }
}
