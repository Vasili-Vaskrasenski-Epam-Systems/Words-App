import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { EUserType } from './../app-enums';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public currentUserName: string;
  public userRole: string;
  public userId: string;
  public roleTypes = EUserType;
  
  constructor(private svc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUserName = this.svc.currentUserValue.name;
    this.userRole = this.svc.currentUserValue.userType.toString();
    this.userId = this.svc.currentUserValue.id;
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
