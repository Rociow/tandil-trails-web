import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Resena } from '../models/resena.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listar(idSendero: number): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${this.apiUrl}/senderos/${idSendero}/resenas`);
  }


  crear(idSendero: number, resena: { comentario: string, puntuacion: number }): Observable<Resena> {
    return this.http.post<Resena>(`${this.apiUrl}/senderos/${idSendero}/resenas`, resena);
  }

  eliminar(idSendero: number, idResena: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/senderos/${idSendero}/resenas/${idResena}`);
  }

  editar(idSendero: number, idResena: number, resena: { comentario: string, puntuacion: number }): Observable<Resena> {
    return this.http.put<Resena>(`${this.apiUrl}/senderos/${idSendero}/resenas/${idResena}`, resena);
  }
}
