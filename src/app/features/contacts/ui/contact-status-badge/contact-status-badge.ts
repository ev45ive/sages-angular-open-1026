import { Component, computed, input } from '@angular/core';
import { ContactStatus } from '@feature/contacts/model/contact';
import { ContactStatusLabel } from '@feature/contacts/model/contact-status-config';

@Component({
  imports: [],
  selector: 'app-contact-status-badge',
  styles: `
    :host {
      display: block;
      --badge-bg: var(--mat-sys-surface-container-highest);
      --badge-fg: var(--mat-sys-on-surface);
    }

    :host([data-contact-status='customer']) {
      --badge-bg: var(--mat-sys-primary-container);
      --badge-fg: var(--mat-sys-on-primary-container);
    }

    :host([data-contact-status='lead']) {
      --badge-bg: var(--mat-sys-tertiary-container);
      --badge-fg: var(--mat-sys-on-tertiary-container);
    }

    :host([data-contact-status='prospect']) {
      --badge-bg: var(--mat-sys-secondary-container);
      --badge-fg: var(--mat-sys-on-secondary-container);
    }

    :host([data-contact-status='churned']) {
      --badge-bg: var(--mat-sys-error-container);
      --badge-fg: var(--mat-sys-on-error-container);
    }
  `,
  template: `<span class="rounded-sm px-3 py-1 text-label-md bg-(--badge-bg) text-(--badge-fg)">
    {{ label() }}
  </span>`,
  // Reflect contact status as DOM [data-contact-status] for CSS variants
  host: { '[attr.data-contact-status]': 'status()' },
})
export class ContactStatusBadge {
  public readonly status = input.required<ContactStatus>();

  protected readonly label = computed(() => ContactStatusLabel[this.status()]);
}
