export class Constants {
  public static guidEmpty = "00000000-0000-0000-0000-000000000000";
  public static currentUser = "currentUser";

  //check for token expiration every 5 minutes
  public static accessTokenCheckInterval = 300000;

  //time before token should expire
  public static accessTokenTimeToRefresh = 300000;
}
