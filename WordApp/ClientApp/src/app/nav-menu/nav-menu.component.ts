import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public currentUserName: string;
  
  constructor(private svc: AuthService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.currentUserName = this.svc.currentUserValue.name;
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
