import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { API_URL } from '@core/tokens';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor, URLInterceptor } from '@core/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    // Overrides core defaults:
    { provide: API_URL, useValue: 'http://localhost:3000/api/' },
    // { provide: HttpClient, useClass: MyAwesomeHttpClient (extends HttpClient) },
    // { provide: HttpHandler, useClass: MyAwesomeHttpHandler },

    provideHttpClient(withInterceptors([URLInterceptor, ErrorInterceptor, AuthInterceptor])),
  ],
};
