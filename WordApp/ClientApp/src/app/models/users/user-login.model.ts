import {EUserType} from './../../app-enums';

export class UserLoginModel {
  public login: string;
  public password: string;
  public token: string;
  public tokenExpirationTime: Date;
  public userType: EUserType;
  public name: string;
  public id: string;
  constructor(login: string, password: string, token: string, tokenExpirationDate: Date) {
    this.login = login;
    this.password = password;
    this.token = token;
    this.tokenExpirationTime = tokenExpirationDate;
  }
}
