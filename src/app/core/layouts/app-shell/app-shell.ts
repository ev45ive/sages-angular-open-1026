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
  template: ` <!-- View: -->

    <div class="app-shell">
      <div class="flex justify-betwen gap-5 app-header">
        <h1 class="text-2xl leading-loose bg-primary text-on-primary app-title">
          Hello {{ title() }}
        </h1>
        <button mat-flat-button>Login</button>
        <button mat-flat-button class="featured">Login</button>
      </div>

      <!-- Show content from parent here: -->
      <ng-content></ng-content>
    </div>`,
})
export class AppShell {
  // @Input({required:true}) title:string = ''

  // title = input.required<string>()
  // title = input<string>();
  title = input('');
}
