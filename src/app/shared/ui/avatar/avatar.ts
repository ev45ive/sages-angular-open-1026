import { Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-avatar',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    @if (src(); as url) {
      <img
        [ngSrc]="url"
        [alt]="name()"
        width="56"
        height="56"
        class="size-14 rounded-full object-cover"
      />
    } @else {
      <span
        role="img"
        [attr.aria-label]="name()"
        class="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-title-md text-on-surface-variant"
      >
        {{ initials() }}
      </span>
    }
  `,
})
export class Avatar {
  readonly src = input<string | null>();
  readonly name = input.required<string>();

  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(''),
  );
}
