import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AppShell } from './core/layouts/app-shell/app-shell';

@Component({
  /* Host: */
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, AppShell],
  styles: [``],
  template: `
    <app-shell [title]="appName()">
      <!-- Whole toolbar -->
      <!-- <p app-toolbar>{{appName()}}</p> -->

      <!-- Just Title -->
      <!-- Token attribute -> [app-title] slot -->
      <!-- <p app-title>{{appName()}}</p> -->

      
        <button app-toolbar-action mat-flat-button>Login</button>
        <button app-toolbar-action mat-flat-button class="featured">Login</button>

      <router-outlet />
    </app-shell>
  `,
})
export class App {
  appName = signal('sages');
}
