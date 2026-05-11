import { Component, OnInit, signal } from '@angular/core';
import { SenderoService } from '../../../core/services/sendero';
import { SenderoResumen } from '../../../core/models/sendero.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Navbar } from '../../../shared/navbar/navbar';
import { SenderoCard } from '../../../shared/sendero-card/sendero-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sendero-list',
  imports: [MatCardModule, MatProgressSpinnerModule, Navbar, SenderoCard],
  templateUrl: './sendero-list.html',
  styleUrl: './sendero-list.scss',
})
export class SenderoList implements OnInit {
  constructor(private senderoService: SenderoService, private route: ActivatedRoute) { }

  senderos: SenderoResumen[] = [];
  cargando = signal(true);

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      const query = params['q'];

      if (query) {
        this.buscarSenderos(query);
      } else {
        this.getSenderos();
      }

    });

  }

  getSenderos(): void {

    this.cargando.set(true);

    this.senderoService.getSenderos().subscribe({

      next: (response) => {
        this.senderos = response.content;
        this.cargando.set(false);
      },

      error: (err) => {
        console.error(err);
        this.cargando.set(false);
      }

    });

  }

  buscarSenderos(query: string): void {

    this.cargando.set(true);

    this.senderoService.buscarSendero(query).subscribe({

      next: (response) => {
        this.senderos = response.content;
        this.cargando.set(false);
      },

      error: (err) => {
        console.error(err);
        this.cargando.set(false);
      }

    });

  }

}
