import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@core/auth/auth';
import { API_URL } from '@core/tokens';
import { catchError, defer, EMPTY, retry, throwError, timeout, timer } from 'rxjs';

export const HTTP_ERRORS = {
  // Authentication and authorization failures.
  auth: [
    401, // Unauthorized
    403, // Forbidden
  ],
  // Transient failures that may be retried.
  retry: [
    0, // Network error, no response
    408, // Request Timeout
    425, // Too Early
    429, // Too Many Requests
    500, // Internal Server Error
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
  ],
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
  const router = inject(Router);

  // defer: headers are rebuilt on every attempt, including the retry.
  return defer(() => next(req.clone({ setHeaders: auth.getHeaders() }))).pipe(
    retry({
      count: 1,
      delay(error) {
        assertHttpError(error);
        if (error.status != 403) return throwError(() => error);

        return auth.refreshToken();
      },
    }),

    catchError((error: unknown) => {
      assertHttpError(error);

      if (error.status == 401) {
        router.navigateByUrl('/login');
        return EMPTY;
      }
      return throwError(() => error);
    }),
  );
};

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  // if (req.headers.has('Authorization')) return next(req);
  // const auth = inject(Auth);

  return next(req).pipe(
    timeout(10_000),
    retry({
      count: 3,
      delay(error, retryCount) {
        if (!HTTP_ERRORS.retry.includes(error.status)) return throwError(() => error);

        // Re-Subscribe same request:
        return timer(500 * retryCount ** 2); // Exponential Back-off (0.5 2.0s 4.5s)
      },
    }),
    catchError((error: unknown) => {
      assertHttpError(error);

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
