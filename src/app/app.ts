import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, MatButton],
  selector: 'app-root',
  styles: [],
  template: `
    <div class="app-shell">
      <div class="flex justify-betwen gap-5 app-header">
        <h1 class="text-2xl leading-loose bg-primary text-on-primary app-title">Hello, {{ title() }}</h1>
        <button mat-flat-button>Login</button>
        <button mat-flat-button class="featured">Login</button>
      </div>

      <router-outlet />
    </div>
  `,
})
export class App {
  protected readonly title = signal('sages');
}
