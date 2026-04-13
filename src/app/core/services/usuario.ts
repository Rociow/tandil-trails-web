import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioRequest, UsuarioResponse } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerPerfil(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/usuarios/me`);
  }

  actualizar(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/usuarios/me`, usuario);
  }

  eliminarCuenta(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/me`);
  }

  agregarFavorito(senderoId: number): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/usuarios/me/favoritos/${senderoId}`, {});
}

eliminarFavorito(senderoId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/usuarios/me/favoritos/${senderoId}`);
}

agregarVisitado(senderoId: number): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/usuarios/me/visitados/${senderoId}`, {});
}

eliminarVisitado(senderoId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/usuarios/me/visitados/${senderoId}`);
}

esFavorito(senderoId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/usuarios/me/favoritos/${senderoId}/existe`);
}

esVisitado(senderoId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/usuarios/me/visitados/${senderoId}/existe`);
}
}
