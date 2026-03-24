import { EstadoSendero } from "./estadosendero.model";
import { ImagenSendero } from "./imagen-sendero.model";
import { Waypoint } from "./waypoint.model";

export interface Sendero {
    id: number;
    nombre: string;
    descripcion: string;
    longitud: number;
    dificultad: 'FACIL' | 'MEDIA' | 'DIFICIL';
    estado: EstadoSendero;
}

export interface SenderoResumen {
  id: number;
  nombre: string;
  descripcion: string;
  longitud: number;
  dificultad: 'FACIL' | 'MODERADO' | 'DIFICIL';
  estado: EstadoSendero;
}

export interface SenderoDetalle extends SenderoResumen {
  coordenadas: number[][];
  waypoints: Waypoint[];
  promedioResenas: number;
  cantidadResenas: number;
  imagenes: ImagenSendero[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface SenderoRequest {
  nombre: string;
  descripcion: string;
  dificultad: 'FACIL' | 'MODERADO' | 'DIFICIL';
  estadoId: number;
  coordenadas: number[][];
}