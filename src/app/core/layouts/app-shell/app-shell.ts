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
  template: ` <div class="app-shell">
    <ng-content select="[app-toolbar]">
      <div class="flex justify-betwen gap-5 app-header">
        <!-- <ng-content select="h1,h2,h3..."></ng-content> -->

        <!-- Header: -->
        <ng-content select="[app-title]">
          <h1 class="text-2xl leading-loose bg-primary text-on-primary app-title">
            {{ title() }}
          </h1>
        </ng-content>

        <!-- Buttons: -->
         <!-- TODO? -->
      </div>
    </ng-content>

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
