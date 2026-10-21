import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [MatButton],
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` 
    <div class="app-shell">
      <div class="flex justify-betwen gap-5 app-header">
        <h1 class="text-2xl leading-loose bg-primary text-on-primary app-title">
          Hello {{ title() }}
        </h1>
        <button mat-flat-button>Login</button>
        <button mat-flat-button class="featured">Login</button>
      </div>

      <ng-content></ng-content>
    </div>`,
})
export class AppShell {
  title = input('');

  // isLoding = input('');
  // hasIcon = input('');
  // buttonA = input('');
  // buttonB = input('');
}
