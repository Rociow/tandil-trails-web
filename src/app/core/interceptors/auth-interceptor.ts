import { HttpInterceptorFn } from '@angular/common/http';

/*
@param req — el request HTTP que está a punto de salir
@param next — una función que se llama para enviar el request al siguiente interceptor en la cadena o al backend si no hay más interceptores

El interceptor verifica si hay un token de autenticación almacenado en el localStorage. Si existe, clona el request original y agrega un encabezado Authorization con el token. Luego, envía el request modificado al siguiente interceptor o al backend. Si no hay token, simplemente envía el request original sin modificaciones.
*/
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
