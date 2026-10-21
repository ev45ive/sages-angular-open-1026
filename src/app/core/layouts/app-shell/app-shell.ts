import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ThemeToggle } from '../../theme/theme-toggle/theme-toggle';

@Component({
  selector: 'app-shell',
  imports: [MatButton, ThemeToggle],
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <ng-content select="[app-toolbar]">
      <!-- <ng-content select="h1,h2,h3..."></ng-content> -->

      <div class="bg-primary text-on-primary pt-3 pb-2">
        <div class="container mx-auto flex justify-between items-center gap-5">
          <!-- Header: -->
          <ng-content select="[app-title]">
            <h1 class="text-2xl leading-loose app-title">
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

    <div class="grid mx-auto container my-5 gap-5">
      <!-- Composition: -->
      <ng-content></ng-content>
    </div>`,
})
export class AppShell {
  title = input('');
}
