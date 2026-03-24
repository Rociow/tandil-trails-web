import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sendero, SenderoDetalle, SenderoResumen } from '../models/sendero.model';

@Injectable({
  providedIn: 'root',
})
export class SenderoService {}
