import { EUserType } from './../../app-enums';

export class UserModel {
  name: string;
  password: string;
  userType: EUserType;
  id: string;
  rowVersion: string;

  constructor(name: string, password: string, userType: EUserType, id: string, rowVersion: string) {
    this.name = name;
    this.password = password;
    this.userType = userType;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
