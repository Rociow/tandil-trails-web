import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenderoService } from '../../../core/services/sendero';
import { SenderoDetalle as SenderoDetalleModel } from '../../../core/models/sendero.model';
import { Navbar } from '../../../shared/navbar/navbar';
import L from 'leaflet';

@Component({
  selector: 'app-sendero-detalle',
  imports: [Navbar],
  templateUrl: './sendero-detalle.html',
  styleUrl: './sendero-detalle.scss',
})
export class SenderoDetalle implements OnInit, AfterViewInit {

  constructor(
    private senderoService: SenderoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  sendero: SenderoDetalleModel | null = null;
  cargando = true;
  error = false;
  private map: any;
  private mapReady = false;
  private dataReady = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.senderoService.getSendero(id).subscribe({
      next: (sendero) => {
        this.sendero = sendero;
        this.cargando = false;
        this.dataReady = true;
          this.cdr.detectChanges();
        if (this.mapReady) this.dibujarRuta();
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
        this.error = true;
      }
    });
  }

  ngAfterViewInit(): void {
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
    if (this.dataReady) this.dibujarRuta();
  }

  private dibujarRuta(): void {
    if (!this.sendero?.coordenadas?.length) return;

    // El backend devuelve [lon, lat] pero Leaflet espera [lat, lon]
    const coordenadas = this.sendero.coordenadas.map(c => [c[1], c[0]] as [number, number]);

    const polyline = L.polyline(coordenadas, { color: '#FF5722', weight: 4 });
    polyline.addTo(this.map);

    // Zoomea automáticamente para mostrar toda la ruta
    this.map.fitBounds(polyline.getBounds());
  }
}