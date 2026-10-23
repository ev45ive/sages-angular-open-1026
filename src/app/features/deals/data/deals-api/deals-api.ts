import { inject, Service } from '@angular/core';
import { Auth } from '@core/auth/auth';
import { Deal } from '@feature/deals/model/deal';

// const API_URL = `http://localhost:3000/api/`;

import { API_URL } from '@core/tokens';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';

type PagingObject<T> = { items: T[]; limit: number; offset: number };

@Service()
export class DealsAPI {
  protected auth = inject(Auth);

  protected apiURL = inject(API_URL);

  http = inject(HttpClient);

  fetchDeals(q = ''): Observable<Deal[]> {

    return this.http
      .get<PagingObject<Deal>>(`${this.apiURL}deals`, {
        params: { q: q },
        headers: { ...this.auth.getHeaders() },
      })
      .pipe(
        // step 2
        catchError((error) => {
          throw new Error(error.error.error.message);
        }),
        // step 3
        // step ...
        
        tap(console.log),
        
        map((res) => res.items),

        // ^-------O-|>
        //         v - map()
        
        // ^-------i-|>
        //         v - delay()

        // tap(console.log),
        
        // ^--------------i-|>
      );
  }

  fetchDealById(id = '') {
    return this.http.get<Deal>(`${this.apiURL}deals/${id}`, {
      headers: { ...this.auth.getHeaders() },
    });
  }
}
