import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguredRoutes } from './routing/configured-routes';

import { AuthService } from './auth/auth.service';

import { UserModel } from './users/user.model';
import { Enums } from './app-enums';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  
  constructor(private router: Router, private authenticationService: AuthService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    else {
      var requestedRoute = ConfiguredRoutes.routes.find(r => r.route.path === route.routeConfig.path);

      if (!requestedRoute.roles.length || requestedRoute.roles.find(r => Enums.EUserType[r] === currentUser.userType.toString())) {
        return true;
      }     
    }
    
    this.router.navigate(['/forbidden']);
    return false;
  }


}
