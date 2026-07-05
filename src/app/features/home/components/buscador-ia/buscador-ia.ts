import { Component, EventEmitter, Output } from '@angular/core';
import { SenderoService } from '../../../../core/services/sendero';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SenderoCard } from '../../../../shared/sendero-card/sendero-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-buscador-ia',
imports: [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  FormsModule,
  SenderoCard  // o como se llame tu componente de card
],
  templateUrl: './buscador-ia.html',
  styleUrl: './buscador-ia.scss',
})
export class BuscadorIa {
  constructor(private senderoService: SenderoService, private Router: Router) { }

  query: string = '';
  senderos: any[] = [];
  cargando: boolean = false;
  error: string = '';
  busquedaRealizada: boolean = false;
  @Output() resultadosEncontrados = new EventEmitter<any[]>();

  buscar() {
    if (!this.query.trim()) return;

    this.cargando = true;
    this.senderoService.buscarConIA(this.query).subscribe({
      next: (response) => {
        this.senderos = response.content;
        this.cargando = false;
        this.busquedaRealizada = true;
        this.resultadosEncontrados.emit(this.senderos);
      },
      error: (err) => {
        this.error = 'Error al buscar senderos.';
        this.cargando = false;
        this.busquedaRealizada = true;
      }
    });

  }
}
