import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },
  { path: 'senderos', canActivate: [authGuard], loadComponent: () => import('./features/senderos/sendero-list/sendero-list').then(m => m.SenderoList) }, //Es una función que devuelve una promesa — Angular la ejecuta solo cuando el usuario navega a esa ruta, si un usuario ingresa no es necesario que se cargue toda la info de los senderos, solo cuando el usuario navega a esa ruta, se carga la info de los senderos. Esto mejora el rendimiento de la aplicación, ya que no se cargan componentes innecesarios al inicio.
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];