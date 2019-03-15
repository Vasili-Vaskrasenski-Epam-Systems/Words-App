import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private alertSerevice: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload(true);
      }

      if (err.status === 404) {
        this.alertSerevice.error("Ooops, it looks like resource not found");
      }

      if (err.status === 500) {
        this.alertSerevice.error("Ooops, something went wrong and server felt bad");
      }

      console.log(err.error.text);
      const error = err.error.text || err.error.message || err.error;
      return throwError(error);
    }));
  }
}
