import { Component, OnInit, signal } from '@angular/core';
import { SenderoService } from '../../../core/services/sendero';
import { SenderoResumen } from '../../../core/models/sendero.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sendero-list',
  imports: [MatCardModule, MatProgressSpinnerModule],
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
  console.log('response:', response);
  this.senderos = response.content;
  this.cargando.set(false);
  console.log('cargando:', this.cargando());
},
      error: (err) => {
        console.error(err);
          this.cargando.set(false);
      }
    });
  }
}
