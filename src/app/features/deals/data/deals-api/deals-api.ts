import { inject, Service } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

type PagingObject<T> = { items: T[]; limit: number; offset: number };

@Service()
export class DealsAPI {
  http = inject(HttpClient);

  fetchDeals(q = '') {
    return this.http
      .get<PagingObject<Deal>>(`deals`, {
        params: { q: q },
      })
      .pipe(map((res) => res.items));
  }

  fetchDealById(id = '') {
    return this.http.get<Deal>(`deals/${id}`, {});
  }
}
