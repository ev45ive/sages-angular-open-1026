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
    return this.http.get(`${this.apiURL}deals`, {
      params: { q: q },
      headers: { ...this.auth.getHeaders() },
    });
  }

  fetchDealById(id=''){
    // TODO...
  }
}
