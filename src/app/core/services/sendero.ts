import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse, Sendero, SenderoDetalle, SenderoRequest, SenderoResumen } from '../models/sendero.model';

@Injectable({
  providedIn: 'root',
})
export class SenderoService {
  private apiUrl = `${environment.apiUrl}/senderos`;

  constructor(private http: HttpClient) { }

  getSenderos(page: number = 0, size: number = 10): Observable<PaginatedResponse<SenderoResumen>> {
    return this.http.get<PaginatedResponse<SenderoResumen>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getSendero(id: number): Observable<SenderoDetalle> {
    return this.http.get<SenderoDetalle>(`${this.apiUrl}/${id}`);
  }

  buscarSendero(query: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<SenderoResumen>> {
    return this.http.get<PaginatedResponse<SenderoResumen>>(`${this.apiUrl}/buscar?q=${encodeURIComponent(query)}&page=${page}&size=${size}`);
  }

  buscarConIA(query: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<SenderoResumen>> {
  return this.http.get<PaginatedResponse<SenderoResumen>>(`${this.apiUrl}/buscar-ia?query=${encodeURIComponent(query)}&page=${page}&size=${size}`
  );
}

  crearSendero(sendero: SenderoRequest): Observable<SenderoDetalle> {
    return this.http.post<SenderoDetalle>(this.apiUrl, sendero);
  }

  actualizarSendero(id: number, sendero: SenderoRequest): Observable<SenderoDetalle> {
    return this.http.put<SenderoDetalle>(`${this.apiUrl}/${id}`, sendero);
  }

  eliminarSendero(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
