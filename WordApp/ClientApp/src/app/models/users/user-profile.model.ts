export class UserProfileModel {
  public firstName: string;
  public lastName: string;
  public birthDate: Date;

  constructor(firstName: string, lastName: string, birthDate: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }
}
