import { Component, effect, inject, linkedSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsAPI } from '@feature/contacts/data/contacts-api/contacts-api';
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

      <app-contact-search-form [(query)]="query" />

      <div class="grid gap-4 sm:grid-cols-2">
        @if (contacts.isLoading()) {
          Loading contacts...
        } @else if (contacts.error()) {
          Error Loading contacts...
        } @else {
          @for (contact of contacts.value(); track contact.id) {
            <app-contact-card [contact]="contact" />
          } @empty {
            <p class="text-body-md text-on-surface-variant">No contacts found</p>
          }
        }
      </div>
    </div>
  `,
})
export class ContactSearchPage {
  router = inject(Router);
  route = inject(ActivatedRoute);
  api = inject(ContactsAPI);

  params = toSignal(this.route.queryParams, { initialValue: { q: '' } });

  query = linkedSignal(() => this.params().q ?? '');

  // this.router.navigate(['../search'])

  searchFromUrlParams = effect(() => {
    this.router.navigate([], {
      queryParams: { q: this.query() },
      relativeTo: this.route,
    });
  });

  contacts = rxResource({
    params: () => ({ q: this.params().q ?? '' }),
    stream: ({ params: { q } }) => this.api.fetchContacts(q),
  });
}
