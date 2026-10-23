import { Component } from '@angular/core';
import { mockContacts } from '@feature/contacts/data/mock-contacts';
import { ContactCard } from '@feature/contacts/ui/contact-card/contact-card';
import { ContactSearchForm } from '@feature/contacts/ui/contact-search-form/contact-search-form';

@Component({
  imports: [ContactCard, ContactSearchForm],
  selector: 'app-contact-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-5 p-5">
      <h1 class="text-headline-md text-on-surface">Contacts</h1>

      <app-contact-search-form />

      <div class="grid gap-4 sm:grid-cols-2">
        @for (contact of contacts; track contact.id) {
          <app-contact-card [contact]="contact" />
        } @empty {
          <p class="text-body-md text-on-surface-variant">No contacts found</p>
        }
      </div>
    </div>
  `,
})
export class ContactSearchPage {
  protected readonly contacts = mockContacts;
}
