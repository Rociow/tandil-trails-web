import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  //antes si algún componente quería sabre si el usuario estaba logueado, tenía que llamar a isLoggedIn() cada vez, lo que no era eficiente ni reactivo. Ahora, con el BehaviorSubject, cualquier componente puede suscribirse a logueado$ y reaccionar automáticamente a los cambios en el estado de autenticación sin necesidad de hacer llamadas repetidas a isLoggedIn().
  //La diferencia clave es que antes cada componente tenía que preguntar "¿estoy logueado?" activamente. Ahora el AuthService les avisa a todos los suscriptores cuando el estado cambia, sin que nadie tenga que preguntar.
  //isLoggedIn() sigue existiendo para casos puntuales como el guard, pero el navbar ya no lo necesita.
  private logueadoSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token')); //Cualquier componente que se suscriba recibirá el último estado de inmediato. Es el productor. Solo el servicio decide cuándo cambia el estado (por ejemplo, después de validar el token).
  logueado$ = this.logueadoSubject.asObservable(); //versión de "solo lectura" del behaviorsubject, para que los componentes no puedan modificar y emitir nuevos valores directamente.

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.logueadoSubject.next(false);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.logueadoSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}