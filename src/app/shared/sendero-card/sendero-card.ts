import { Component, Input } from '@angular/core';
import { SenderoResumen } from '../../core/models/sendero.model';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sendero-card',
  imports: [MatCardModule, RouterLink],
  templateUrl: './sendero-card.html',
  styleUrl: './sendero-card.scss',
})
export class SenderoCard {
  @Input() sendero!: SenderoResumen;
  @Input() compacto = false;
}