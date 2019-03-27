import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        //this.authenticationService.logout();
        //location.href = ('/login');
      }

      if (err.status === 403) {
        location.href = ('/forbidden');
      }

      if (err.status === 404) {
        this.alertService.error("Ooops, it looks like resource not found");
      }

      if (err.status === 500) {
        this.alertService.error("Ooops, something went wrong and server felt bad");
      }

      const error = err.error ? err.error.text || err.error.message : err.message;
      return throwError(error);
    }));
  }
}
