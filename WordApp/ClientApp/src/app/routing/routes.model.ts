import { ERoutes, EUserType } from './../app-enums';

export class RoutesModel {
  public route: ERoutes;
  public roles: EUserType[];

  constructor(route: ERoutes, roles: EUserType[]) {
    this.route = route;
    this.roles = roles;
  }
}
