import { HttpClient, HttpContext, HttpContextToken } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthTokens } from './auth-tokens';

export const SKIP_AUTH = new HttpContextToken(() => false);

const STORAGE_KEY = 'auth.tokens';

@Service()
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokens = signal<AuthTokens | null>(this.readStoredTokens());

  readonly isLoggedIn = computed(() => this.tokens() !== null);

  public getHeaders(): Record<string, string> {
    const accessToken = this.tokens()?.accessToken;
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  public login(email: string, password: string): Observable<AuthTokens> {
    return this.http
      .post<AuthTokens>('auth/login', { email, password }, { context: new HttpContext().set(SKIP_AUTH, true) })
      .pipe(tap((tokens) => this.setTokens(tokens)));
  }

  public refreshToken(): Observable<AuthTokens> {
    const refreshToken = this.tokens()?.refreshToken ?? '';
    return this.http
      .post<AuthTokens>('auth/refresh', { refreshToken }, { context: new HttpContext().set(SKIP_AUTH, true) })
      .pipe(tap((tokens) => this.setTokens(tokens)));
  }

  public logout() {
    this.setTokens(null);
    this.router.navigateByUrl('/login');
  }

  private setTokens(tokens: AuthTokens | null) {
    this.tokens.set(tokens);
    if (tokens) localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    else localStorage.removeItem(STORAGE_KEY);
  }

  private readStoredTokens(): AuthTokens | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthTokens) : null;
  }
}
