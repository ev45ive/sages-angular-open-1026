import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { API_URL } from '@core/tokens';
import { catchError } from 'rxjs';

export const URLInterceptor: HttpInterceptorFn = (req, next) => {
  // Open for overrides:
  if (req.url.match(/^https?:/)) return next(req);

  const apiURL = inject(API_URL);

  return next(
    req.clone({
      url: apiURL + req.url,
    }),
  );
};

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Authorization')) return next(req);

  const auth = inject(Auth);

  return next(
    req.clone({
      setHeaders: auth.getHeaders(),
    }),
  );
};

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  // if (req.headers.has('Authorization')) return next(req);
  // const auth = inject(Auth);

  return next(req).pipe(
    catchError((error) => {
      throw new Error(error.error.error.message);
    }),
  );
};

// Chain of responsibility:

// HttpClient.handler = IntA

// IntA.next = IntB
// IntB.next = IntN

// IntN.next =  HttpHandler -> Observable + .pipe()
