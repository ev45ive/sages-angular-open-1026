import { inject, Service } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { API_URL } from '@core/tokens';
import { HttpClient } from '@angular/common/http';
 

@Service()
export class DealsAPI {
  protected auth = inject(Auth);

  protected apiURL = inject(API_URL);

  http = inject(HttpClient);

  fetchDeals(q = '') {
    return this.http.get<{ items: Deal[] }>(`${this.apiURL}deals`, {
      params: { q: q },
      headers: { ...this.auth.getHeaders() },
    });
  }

  fetchDealById(id = '') {
    return this.http.get<Deal>(`${this.apiURL}deals/${id}`, {
      headers: { ...this.auth.getHeaders() },
    });
  }
}
