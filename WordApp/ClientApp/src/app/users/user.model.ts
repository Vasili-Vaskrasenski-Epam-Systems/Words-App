export class UserModel{
  name: string;
  password: string;
  userType: EUserType;
  id: string;
  rowVersion: string;

  constructor(name: string, password: string, id: string, rowVersion: string) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
