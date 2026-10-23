import { inject, Service } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { API_URL } from '@core/tokens';

@Service()
export class DealsAPI {
  protected auth = inject(Auth);

  protected apiURL = inject(API_URL);

  async fetchDeals(q = '', init?: RequestInit): Promise<Deal[]> {
    const resp = await fetch(`${this.apiURL}deals?q=${q}`, {
      // signal: huston.signal,
      headers: {
        ...init?.headers,
        ...this.auth.getHeaders(),
      },
      ...init,
    });

    // JSON / Error handling:
    if (!resp.ok) {
      const e = await resp.json();
      throw new Error(e.error.message);
    }

    const data = await resp.json();

    // mapping
    return data.items; 
  }
}
