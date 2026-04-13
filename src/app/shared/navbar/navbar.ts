import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, MatButton, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(private authService: AuthService, private router: Router) { }

  estaLogueado = false;

  ngOnInit() {
    this.estaLogueado = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
