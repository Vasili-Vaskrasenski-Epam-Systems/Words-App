import { EUserType } from './../../app-enums';
import { UserTokenModel } from './user-token.model';

export class UserModel {
  name: string;
  password: string;
  userType: EUserType;
  id: string;
  rowVersion: string;
  token: UserTokenModel;
  email: string;

  constructor(name: string, password: string, userType: EUserType, email: string, id: string, rowVersion: string) {
    this.name = name;
    this.password = password;
    this.userType = userType;
    this.id = id;
    this.rowVersion = rowVersion;
    this.email = email;
  }
}
