import { inject, Service } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { API_URL } from '@core/tokens';
import { HttpClient } from '@angular/common/http';

/* 
    Sync/Async APIs

    var - sync 1 value
    signal() - sync 1 value
    
    fn() - lazy, sync value 1-1
    promise - async, value   1-*
    
    []  - sync ...value
    Observable - lazy, async ...value  1-1

*/

@Service()
export class DealsAPI {
  protected auth = inject(Auth);

  protected apiURL = inject(API_URL);

  http = inject(HttpClient);

  fetchDeals(q = '') {
    //
    // Unicast<T> observable - RECIPE<T>
    //
    const obs = this.http.get(`${this.apiURL}deals`, {
      params: { q: q },
      headers: { ...this.auth.getHeaders() },
    });

    // ----

    // Subscriber A -> Request
    const sub = obs.subscribe(console.log);

    sub.unsubscribe();

    // Subscriber B -> Request
    obs.subscribe({
      next: console.log,
      error: console.log,
      complete: () => console.log('complete'),
    });
  }

  //   async fetchDeals(q = '', init?: RequestInit): Promise<Deal[]> {
  //     const resp = await fetch(`${this.apiURL}deals?q=${q}`, {
  //       // signal: huston.signal,
  //       headers: {
  //         ...init?.headers,
  //         ...this.auth.getHeaders(),
  //       },
  //       ...init,
  //     });

  //     // JSON / Error handling:
  //     if (!resp.ok) {
  //       const e = await resp.json();
  //       throw new Error(e.error.message);
  //     }

  //     const data = await resp.json();

  //     // mapping
  //     return data.items;
  //   }
}
