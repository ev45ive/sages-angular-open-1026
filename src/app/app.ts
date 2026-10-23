import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '@core/auth/auth';
import { AppShell } from './core/layouts/app-shell/app-shell';
import { ThemeToggle } from './core/theme/theme-toggle/theme-toggle';

@Component({
  /* Host: */
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, MatButton, AppShell, ThemeToggle],
  styles: [``],
  template: `
    <app-shell [title]="appName()">
      <!-- <p app-toolbar>{{appName()}}</p> -->
      <!-- <p app-title>{{appName()}}</p> -->

      <a app-toolbar-action mat-flat-button href="/deals">Deals</a>
      <a app-toolbar-action mat-flat-button href="/contacts">Contacts</a>

      <app-theme-toggle app-toolbar-action />
      @if (auth.isLoggedIn()) {
        <button app-toolbar-action mat-raised-button (click)="auth.logout()">Logout</button>
      } @else {
        <a app-toolbar-action mat-raised-button routerLink="/login">Login</a>
      }

      <!-- Main content -->
      <router-outlet />
    </app-shell>
  `,
})
export class App {
  readonly auth = inject(Auth);
  appName = signal('Sages');
}
