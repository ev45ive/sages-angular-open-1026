import { Component, computed, inject, input } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Theme } from '../../theme/theme';

@Component({
  selector: 'app-shell',
  imports: [MatButton, MatIconButton],
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
            <button
              mat-icon-button
              type="button"
              class="[--mat-icon-button-icon-color:var(--mat-sys-on-primary)]"
              [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
              (click)="theme.toggle()"
            >
              <span class="material-symbols-outlined">{{ themeIcon() }}</span>
            </button>
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
  protected readonly theme = inject(Theme);
  protected readonly themeIcon = computed(() => (this.theme.isDark() ? 'light_mode' : 'dark_mode'));
  title = input('');

  /* Configuration + if/else */
  // isLoding = input('');
  // hasIcon = input('');
  // buttonA = input('');
  // buttonB = input('');
}
