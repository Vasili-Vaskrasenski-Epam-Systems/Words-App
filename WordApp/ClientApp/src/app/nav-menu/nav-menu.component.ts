import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Enums } from './../app-enums';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public currentUserName: string;
  public isAdmin: boolean;

  constructor(private svc: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUserName = this.svc.currentUserValue.name;
    this.isAdmin = this.svc.currentUserValue.userType === Enums.EUserType.Administrator;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.svc.logout();
    this.router.navigate(['/login']);
  }

}
