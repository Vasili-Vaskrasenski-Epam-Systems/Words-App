import { EUserType } from './../app-enums';

export class RoutesModel {
  public route: string;
  public roles: EUserType[];

  constructor(route: string, roles: EUserType[]) {
    this.route = route;
    this.roles = roles;
  }
}
