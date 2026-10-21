import { DOCUMENT } from '@angular/common';
import { Service, effect, inject, signal } from '@angular/core';

@Service()
export class Theme {
  private readonly document = inject(DOCUMENT);
  readonly isDark = signal(
    this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false,
  );

  constructor() {
    // Material tokens resolve light-dark() from the html color-scheme.
    effect(() => {
      this.document.documentElement.style.colorScheme = this.isDark() ? 'dark' : 'light';
    });
  }

  toggle(): void {
    this.isDark.update((dark) => !dark);
  }
}
