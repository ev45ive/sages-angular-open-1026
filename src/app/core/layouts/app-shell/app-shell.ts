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
  template: ` <ng-content select="[app-toolbar]">
      <!-- <ng-content select="h1,h2,h3..."></ng-content> -->

      <div class="bg-slate-600 py-3">
        <div class="container mx-auto flex justify-between gap-5">
          <!-- Header: -->
          <ng-content select="[app-title]">
            <h1 class="text-2xl leading-loose text-primary app-title">
              {{ title() }}
            </h1>
          </ng-content>

          <!-- Buttons: -->
          <div class="flex gap-5">
            <ng-content select="[app-toolbar-action]" />
          </div>
        </div>
      </div>
    </ng-content>

    <div class="my-5 mx-auto container grid gap-5">
      <!-- Composition: -->
      <ng-content></ng-content>
    </div>`,
})
export class AppShell {
  title = input('');

  /* Configuration + if/else */
  // isLoding = input('');
  // hasIcon = input('');
  // buttonA = input('');
  // buttonB = input('');
}
