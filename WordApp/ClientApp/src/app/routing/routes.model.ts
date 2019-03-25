import { Route } from '@angular/router';
import { Enums } from './../app-enums';

export class RoutesModel {
  public route: Route;
  public roles: Enums.EUserType[];

  constructor(route: Route, roles: Enums.EUserType[]) {
    this.route = route;
    this.roles = roles;
  }
}
