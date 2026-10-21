import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-shell',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <!-- View: -->

    <div class="app-shell">
      <div class="flex justify-betwen gap-5 app-header">
        <h1 class="text-2xl leading-loose bg-primary text-on-primary app-title">
          Hello
        </h1>
        <button mat-flat-button>Login</button>
        <button mat-flat-button class="featured">Login</button>
      </div>

      <!-- Show content from parent here: -->
      <ng-content></ng-content>

    </div>`,
})
export class AppShell {}
