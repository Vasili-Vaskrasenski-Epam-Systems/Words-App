import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecuredRoutes } from './routing/secured-routes';
import { AuthService } from './auth/auth.service';
import { EUserType } from './app-enums';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    else {
      var requestedRoute = SecuredRoutes.routes.find(r => r.route.toString() === route.routeConfig.path);

      if (!requestedRoute.roles.length || requestedRoute.roles.find(r => EUserType[r] === currentUser.userType.toString())) {
        return true;
      }
    }

    this.router.navigate(['/forbidden']);
    return false;
  }


}
