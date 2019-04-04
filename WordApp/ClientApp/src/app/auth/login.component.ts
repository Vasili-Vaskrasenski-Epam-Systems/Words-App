import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from './../alert/alert.service';
import { AuthService } from './auth.service';
import { ExternalAuthService } from './external-auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  private returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthService, private alertService: AlertService, private externalAuthService: ExternalAuthService) {
    if (this.authenticationService.currentUser) {
      console.log(this.authenticationService.currentUser);
      console.log(this.authenticationService.currentUserValue);
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error)
            this.alertService.error(error);
          this.loading = false;
        });
  }

  loginWithGoogle() {
    this.loading = true;
    this.externalAuthService.loginViaGoogle();
  }
}
