import { Component, OnInit, signal } from '@angular/core';
import { SenderoService } from '../../../core/services/sendero';
import { SenderoResumen } from '../../../core/models/sendero.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Navbar } from '../../../shared/navbar/navbar';
import { SenderoCard } from '../../../shared/sendero-card/sendero-card';

@Component({
  selector: 'app-sendero-list',
  imports: [MatCardModule, MatProgressSpinnerModule, Navbar, SenderoCard],
  templateUrl: './sendero-list.html',
  styleUrl: './sendero-list.scss',
})
export class SenderoList implements OnInit {
  constructor(private senderoService: SenderoService) { }

  senderos: SenderoResumen[] = [];
  cargando = signal(true);

  ngOnInit() {
    this.senderoService.getSenderos().subscribe({
      next: (response) => {
        this.senderos = response.content;
        this.cargando.set(false);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
