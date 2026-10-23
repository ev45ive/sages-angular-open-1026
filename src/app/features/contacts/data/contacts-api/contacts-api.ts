import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Contact } from '@feature/contacts/model/contact';
import { map } from 'rxjs';

type PagingObject<T> = { items: T[]; total: number; offset: number; limit: number };

@Service()
export class ContactsAPI {
  http = inject(HttpClient);

  fetchContacts(q = '', offset = 0, limit = 20) {
    return this.http
      .get<{ contacts: PagingObject<Contact> }>(`contacts`, {
        params: { q, offset, limit },
      })
      .pipe(map((res) => res.contacts.items));
  }

  checkEmail(email: string) {
    return this.http.get<{ exists: boolean }>(`contacts/check-email`, {
      params: { email },
    });
  }

  fetchContactById(id = '') {
    return this.http.get<Contact>(`contacts/${id}`, {});
  }
}
