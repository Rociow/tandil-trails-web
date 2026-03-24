import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Permite a angular acceder a los servicios HTTP y manejar las solicitudes y respuestas de manera eficiente, incluyendo la capacidad de agregar interceptores para modificar las solicitudes o respuestas según sea necesario.

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
