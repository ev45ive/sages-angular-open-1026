import { Component, input } from '@angular/core';

export type HeadingLevel = 2 | 3 | 4 | 5 | 6;

/** Default header of `ui-card`, or an explicit header with its own `title`/`subtitle`. */
@Component({
  selector: 'ui-card-header',
  host: { class: 'flex items-start justify-between gap-4' },
  template: `
    <div class="min-w-0">
      @if (title()) {
        <div role="heading" [attr.aria-level]="headingLevel()" class="text-title-md text-on-surface">
          {{ title() }}
        </div>
      }
      @if (subtitle()) {
        <p class="mt-1 text-body-md text-on-surface-variant">{{ subtitle() }}</p>
      }
    </div>
    <div class="flex shrink-0 items-center gap-3">
      <ng-content select="[ui-card-badge]" />
      <ng-content select="[ui-card-actions]" />
      <!-- <ng-content></ng-content> -->
    </div>
  `,
})
export class UiCardHeader {
  title = input<string>();
  subtitle = input<string>();
  headingLevel = input<HeadingLevel>(2);
}
