import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
  { path: 'senderos', loadComponent: () => import('./features/senderos/sendero-list/sendero-list').then(m => m.SenderoList) },
  { path: 'sendero/:id', loadComponent: () => import('./features/senderos/sendero-detalle/sendero-detalle').then(m => m.SenderoDetalle) },
  { path: '', loadComponent: () => import('./features/home/home/home').then(m => m.Home) },
];