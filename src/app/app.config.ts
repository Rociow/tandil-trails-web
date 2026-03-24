//todo lo que necesita existir una sola vez en toda la app se registra acá

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,  withInterceptors } from '@angular/common/http'; // Permite a angular acceder a los servicios HTTP y manejar las solicitudes y respuestas de manera eficiente, incluyendo la capacidad de agregar interceptores para modificar las solicitudes o respuestas según sea necesario.
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = { //Cada provide...() es como decirle a Angular "quiero que esto esté disponible en toda la app"
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])) //configuración adicional del HttpClient. Le pide HTTP, y además que cada request pase por este interceptor antes de salir.
  ]
};
