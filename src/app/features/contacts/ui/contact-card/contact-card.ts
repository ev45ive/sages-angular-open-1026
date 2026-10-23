import { Component, computed, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Contact } from '@feature/contacts/model/contact';
import { Avatar } from '@shared/ui/avatar/avatar';
import { ContactStatusBadge } from '../contact-status-badge/contact-status-badge';

@Component({
  imports: [MatCard, Avatar, ContactStatusBadge],
  selector: 'app-contact-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <mat-card appearance="outlined" class="p-4">
      <div class="flex items-start gap-4">
        <app-avatar [src]="contact().avatarUrl" [name]="fullName()" />

        <div class="grid min-w-0 gap-1">
          <h3 class="text-title-md text-on-surface">{{ fullName() }}</h3>
          <p class="text-body-md text-on-surface-variant">{{ contact().company }}</p>
          <p class="truncate text-body-md text-on-surface-variant">{{ contact().email }}</p>

          <div class="mt-2">
            <app-contact-status-badge [status]="contact().status" />
          </div>
        </div>
      </div>
    </mat-card>
  `,
})
export class ContactCard {
  readonly contact = input.required<Contact>();

  protected readonly fullName = computed(
    () => `${this.contact().firstName} ${this.contact().lastName}`,
  );
}
