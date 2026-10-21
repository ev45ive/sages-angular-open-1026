import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AppShell } from './core/layouts/app-shell/app-shell';
import { ThemeToggle } from './core/theme/theme-toggle/theme-toggle';

@Component({
  /* Host: */
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, AppShell, ThemeToggle],
  styles: [``],
  template: `
    <app-shell [title]="appName()">
      <!-- <p app-toolbar>{{appName()}}</p> -->
      <!-- <p app-title>{{appName()}}</p> -->

      <button app-toolbar-action mat-flat-button>Settings</button>
      <app-theme-toggle app-toolbar-action />
      <button app-toolbar-action mat-raised-button>Login</button>

      <!-- Main content -->
      <router-outlet />
    </app-shell>
  `,
})
export class App {
  appName = signal('Sages');
}
