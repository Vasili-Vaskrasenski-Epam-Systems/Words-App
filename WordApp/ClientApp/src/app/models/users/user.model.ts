import { Enums } from './../../app-enums';
import { UserTokenModel } from './user-token.model';

export class UserModel {
  name: string;
  password: string;
  userType: Enums.EUserType;
  id: string;
  rowVersion: string;
  token: UserTokenModel;

  constructor(name: string, password: string, userType: Enums.EUserType, id: string, rowVersion: string) {
    this.name = name;
    this.password = password;
    this.userType = userType;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
