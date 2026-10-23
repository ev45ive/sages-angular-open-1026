import { Signal, inject, signal, effect } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';
import { finalize } from 'rxjs';
import { DealsAPI } from '../deals-api/deals-api';

export function useDealsResource(dealsFilter: Signal<string>) {
  const api = inject(DealsAPI);

  const value = signal<Deal[]>([]);
  const isLoading = signal(false);
  const error = signal<Error | undefined>(undefined);

  function refresh() {}

  effect((onCleanup) => {
    isLoading.set(true);

    const sub = api
      .fetchDeals(dealsFilter())
      .pipe(finalize(() => isLoading.set(false)))
      .subscribe({
        next: (items) => value.set(items),
        error: (e) => error.set(e),
      });

    onCleanup(() => sub.unsubscribe());
  });

  return {
    value,
    isLoading,
    error,
    refresh,
  };
}
