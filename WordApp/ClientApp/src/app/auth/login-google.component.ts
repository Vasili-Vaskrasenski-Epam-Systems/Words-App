import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";

import { AuthService } from "./auth.service";
import { ExternalAuthService } from "./external-auth.service";
import {AlertService} from "./../alert/alert.service";

import { CommonLoadingComponent } from "./../common/common-loading.component";

import { UserRegistrationModel } from "./../models/users/user-registration.model";
import { UserLoginModel } from "./../models/users/user-login.model";

@Component({ templateUrl: 'login-google.component.html' })
export class LoginGoogleComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef;
  private email: string;

  constructor(private googleAuthService: ExternalAuthService, private authService: AuthService, private alertService: AlertService, private dialog: MatDialog, private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.dialog.open(CommonLoadingComponent, { disableClose: true });
    }
  }

  ngOnInit() {
    this.googleAuthService.getLoginGoogleData().subscribe(e => {
      if (e && e.userType) {
        var loginModel = <UserLoginModel>e;
        this.authService.setCurrentUser(loginModel);
        this.router.navigate(['/']);
        this.dialog.closeAll();
      } else {
        var registrationModel = <UserRegistrationModel>e;
        this.email = registrationModel.email;
        this.emailInput.nativeElement.value = this.email;
        this.dialog.closeAll();
      }
    }, error => {
      this.dialog.closeAll();
      this.router.navigate(['/']);
      this.alertService.error(error);
    });
  }

  public register() {
    this.googleAuthService.confirmGoogleLogin(this.email).subscribe(e => {
      var model = <UserLoginModel>e;
      this.authService.setCurrentUser(model);
      this.router.navigate(['/']);
    });
  }
}


