import { inject, Service } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { API_URL } from '@core/tokens';

@Service()
export class DealsAPI {
  protected auth = inject(Auth);

  protected API_URL = inject(API_URL);

  fetchDeals(q = ''): Promise<Deal[]> {
    return (
      fetch(`${API_URL}deals?q=${q}`, {
        // /resource?params=... URL
        headers: {
          ...this.auth.getHeaders(),
        },
      })
        // JSON / Error handling:
        .then((resp) => {
          if (!resp.ok) {
            return resp.json().then((e) => {
              return Promise.reject(new Error(e.error.message));
            });
          }
          return resp;
        })
        .then((resp) => resp.json())
        .then((data) => data.items)
    ); // mapping
  }
}
