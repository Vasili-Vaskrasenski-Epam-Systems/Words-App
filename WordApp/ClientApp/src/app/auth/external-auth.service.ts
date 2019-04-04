import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from "./../app-constants";
import { ExistingRoutes } from "./../routing/existing-routes";

@Injectable()
export class ExternalAuthService {
  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl + 'api/Authentication';
  }

  public loginViaGoogle() {
    const form = window.document.createElement("form");

    var providerInput = window.document.createElement("input");
    providerInput.setAttribute("type", "hidden");
    providerInput.setAttribute("name", "provider");
    providerInput.setAttribute("value", Constants.googleAuthenticationScheme);

    var returnUrlInput = window.document.createElement("input");
    returnUrlInput.setAttribute("type", "hidden");
    returnUrlInput.setAttribute("name", "returnUrl");
    returnUrlInput.setAttribute("value", ExistingRoutes.loginGoogle);

    form.appendChild(providerInput);
    form.appendChild(returnUrlInput);

    form.setAttribute("method", "post");
    form.setAttribute("action", this.baseUrl + '/LoginWithGoogle');

    //use _self to redirect in same tab, _blank to open in new tab
    //form.setAttribute("target", "_blank");
    form.setAttribute("target", "_self");


    window.document.body.appendChild(form);
    form.submit();
  }

  public getLoginGoogleData(): any {
    var url = this.baseUrl + '/GetLoginGoogleData';
    return this.http.get<any>(url);
  }

  public confirmGoogleLogin(email: string): any {
    var params = new HttpParams({ fromObject: { email: email } });
    return this.http.post<any>(this.baseUrl + '/ConfigrmGoogleLogin', null, { params: params });
  }
}
