import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatButton, RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar { 
  logueado$;
  constructor(private authService: AuthService, private router: Router) { 
     this.logueado$ = this.authService.logueado$;
 }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
