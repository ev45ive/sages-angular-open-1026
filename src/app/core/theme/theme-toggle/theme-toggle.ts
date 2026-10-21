import { Component, computed, Inject, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { Theme } from '../theme';
import { readonly } from '@angular/forms/signals';

@Component({
  imports: [MatIconButton],
  selector: 'app-theme-toggle',
  template: `
    <button
      mat-icon-button
      type="button"
      [attr.aria-label]="theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
      (click)="theme.toggle()"
    >
      <span class="material-symbols-outlined">{{ themeIcon() }}</span>
    </button>
  `,
  styles: [
    `
      :host() {
        --mat-icon-button-icon-color: var(--mat-sys-on-primary);
      }
    `,
  ],
})
export class ThemeToggle {
  // constructor(@Inject(Theme) readonly theme: Theme) {}

  readonly theme = inject(Theme);

  protected readonly themeIcon = computed(() => {
    return this.theme.isDark() ? 'light_mode' : 'dark_mode';
  });
}

// interface IBanana{}
// class BananaImpl{ contructor(@Inject...)}

// ===  VS: ===

// function asd(){
//   const banana = inject(Banana)
// }
