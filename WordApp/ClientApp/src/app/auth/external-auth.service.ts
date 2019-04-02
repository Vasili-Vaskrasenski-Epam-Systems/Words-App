import {Inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class ExternalAuthService {
  constructor(private authService: AuthService) {
    
  }
}
