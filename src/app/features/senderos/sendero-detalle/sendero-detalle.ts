import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SenderoService } from '../../../core/services/sendero';
import { SenderoDetalle as SenderoDetalleModel } from '../../../core/models/sendero.model';
import { Navbar } from '../../../shared/navbar/navbar';
import L from 'leaflet';
import { ResenaService } from '../../../core/services/resena';
import { Resena } from '../../../core/models/resena.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-sendero-detalle',
  imports: [Navbar, DatePipe, DecimalPipe, ReactiveFormsModule],
  templateUrl: './sendero-detalle.html',
  styleUrl: './sendero-detalle.scss',
})
export class SenderoDetalle implements OnInit, AfterViewInit {

  constructor(
    private senderoService: SenderoService,
    private resenaService: ResenaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  sendero: SenderoDetalleModel | null = null;
  cargando = true;
  error = false;
  private map: any;
  private mapReady = false;
  private dataReady = false;
  resenas: Resena[] = [];
  estaLogueado = false;
  resenaForm!: FormGroup;
  errorResena: string | null = null;


  ngOnInit(): void {
    this.estaLogueado = this.authService.isLoggedIn();
    this.resenaForm = this.fb.group({
      comentario: ['', [Validators.required, Validators.minLength(10)]],
      puntuacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.senderoService.getSendero(id).pipe(
      switchMap(sendero => {
        this.sendero = sendero;
        this.dataReady = true;
        this.cdr.detectChanges();
        if (this.mapReady) this.dibujarRuta();
        return this.resenaService.listar(id);
      })
    ).subscribe({
      next: (resenas) => {
        this.resenas = resenas;
        this.cdr.detectChanges();
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

  enviarResena(): void {
    console.log('enviarResena llamado');
    console.log('form valid:', this.resenaForm.valid);
    console.log('form value:', this.resenaForm.value);

    if (this.resenaForm.invalid) return;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resenaService.crear(id, this.resenaForm.value).subscribe({
      next: (resena) => {
        this.resenas.push(resena);
        this.resenaForm.reset();
        this.errorResena = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorResena = 'Ya dejaste una reseña en este sendero.';
        } else {
          this.errorResena = 'Error al enviar la reseña, intentá de nuevo.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}