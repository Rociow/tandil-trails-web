import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SenderoService } from '../../../core/services/sendero';
import { Navbar } from '../../../shared/navbar/navbar';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  constructor(private senderoService: SenderoService, private router: Router) { }

  private map: any;
  private senderos: any[] = [];
  private mapReady = false;
  private dataReady = false;


  ngOnInit() {
    this.senderoService.getSenderos(0, 100).subscribe((response) => {
      this.senderos = response.content;
      this.dataReady = true;
      if (this.mapReady) this.agregarMarcadores();
    });
  }

  ngAfterViewInit() {
    const iconDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.map = L.map('map').setView([-37.3217, -59.1332], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.mapReady = true;
    if (this.dataReady) this.agregarMarcadores();
  }

  private agregarMarcadores() {
    this.senderos.forEach((sendero) => {
      L.marker([sendero.latitud, sendero.lon])
        .addTo(this.map)
        .bindPopup(`<b>${sendero.nombre}</b><br>${sendero.dificultad}`)
        .on('click', () => {
          this.router.navigate(['/sendero', sendero.id]);
        });
    });

  }

}
