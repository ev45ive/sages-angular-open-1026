import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { mockContacts } from '@feature/contacts/data/mock-contacts';
import { ContactStatusLabel } from '@feature/contacts/model/contact-status-config';
import { ContactStatusBadge } from '@feature/contacts/ui/contact-status-badge/contact-status-badge';
import { Avatar } from '@shared/ui/avatar/avatar';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { InfoItem } from '@shared/ui/info-grid/info-item';

@Component({
  imports: [
    DatePipe,
    MatAnchor,
    MatCard,
    RouterLink,
    Avatar,
    ContactStatusBadge,
    InfoGrid,
    InfoItem,
  ],
  selector: 'app-contact-details',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-5 p-5">
      <a mat-button routerLink="/contacts/search" class="justify-self-start">Back to search</a>

      <mat-card appearance="outlined" class="p-5">
        <div class="flex items-start gap-4">
          <app-avatar [src]="contact.avatarUrl" [name]="fullName" />

          <div class="grid gap-1">
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-headline-sm text-on-surface">{{ fullName }}</h1>
              <app-contact-status-badge [status]="contact.status" />
            </div>
            <p class="text-body-lg text-on-surface-variant">{{ contact.company }}</p>
          </div>
        </div>

        <app-info-grid>
          <app-info-item label="Email" [value]="contact.email" />
          <app-info-item label="Phone" [value]="contact.phone" />
          <app-info-item label="Created" [value]="contact.createdAt | date: 'longDate'" />
          <app-info-item label="Status" [value]="statusLabel" />
          <app-info-item label="Notes" [value]="contact.notes" class="@md:col-span-full" />
        </app-info-grid>
      </mat-card>
    </div>
  `,
})
export class ContactDetailsPage {
  // Stub: always shows the first mock contact; route :id is not used yet
  protected readonly contact = mockContacts[0];
  protected readonly fullName = `${this.contact.firstName} ${this.contact.lastName}`;
  protected readonly statusLabel = ContactStatusLabel[this.contact.status];
}
