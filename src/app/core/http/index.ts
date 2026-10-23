import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { API_URL } from '@core/tokens';
import { catchError } from 'rxjs';


export const HTTP_ERRORS = {
  // Authentication and authorization failures.
  auth: [401, 403],
  // Transient failures that may be retried.
  retry: [408, 425, 429, 500, 502, 503, 504],
};


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
    catchError((error:unknown) => {

      assertHttpError(error)

      throw new Error(error.error.error.message);
    }),
  );
};

// Chain of responsibility:

// HttpClient.handler = IntA

// IntA.next = IntB
// IntB.next = IntN

// IntN.next =  HttpHandler -> Observable + .pipe()

// ZodJS
// Zod.parse(Schema<T>, unkonown) -> T | thorw

export type ErrorReponse = {
  error: {
    status: number;
    message: string;
    code: string; // 'UNAUTHORIZED'|...;
  };
};

// Type Guard - Narrow type or throw
function assertHttpError(error: unknown): asserts error is HttpErrorResponse {
  if (!(error instanceof HttpErrorResponse)) throw error;
}
