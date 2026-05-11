import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    RouterLink,

    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  logueado$;
  searchTerm: string = '';

  userInitials: string = 'R';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logueado$ = this.authService.logueado$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  buscar(): void {

    if (!this.searchTerm.trim()) {
      return;
    }

    this.router.navigate(['/senderos'], {
      queryParams: {
        q: this.searchTerm
      }
    });
  }
}