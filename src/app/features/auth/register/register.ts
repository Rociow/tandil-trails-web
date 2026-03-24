import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../../core/services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.register(this.form.value as any).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/senderos']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
