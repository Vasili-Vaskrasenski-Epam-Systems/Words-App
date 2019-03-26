import { Enums } from './../app-enums';

export class RoutesModel {
  public route: Enums.ERoutes;
  public roles: Enums.EUserType[];

  constructor(route: Enums.ERoutes, roles: Enums.EUserType[]) {
    this.route = route;
    this.roles = roles;
  }
}
