import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario';
import { UsuarioResponse } from '../../../core/models/usuario.model';
import { Navbar } from '../../../shared/navbar/navbar';
import { SenderoCard } from '../../../shared/sendero-card/sendero-card';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [Navbar, SenderoCard, MatCardModule, DatePipe],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {
  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef) {}

  usuario: UsuarioResponse | null = null;

  ngOnInit() {
    this.usuarioService.obtenerPerfil().subscribe({
      next: (usuario) => {
          console.log('usuario recibido:', usuario);
        this.usuario = usuario;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}