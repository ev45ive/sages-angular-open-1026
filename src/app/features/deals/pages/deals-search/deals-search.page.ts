import { Component, computed, signal } from '@angular/core';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';

@Component({
  imports: [DealDetailsCard],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <p>deals-search works!</p>

    <!-- Effect - Consumer  -->
    <h1>{{ selectedDeal().title }}</h1>

    <!-- Child component -->
    <app-deal-details-card [deal]="selectedDeal()" />

    <!-- <input [value]="deal().title"> -->
  `,
})
export class DealsSearchPage {
  selectedDealId = signal('d2');

  filter = signal('');

  // Owner
  // selectedDeal = signal<Deal>(mockDeals[0]);

  // Computed() = formula =SUM(A1,B2) - lazy + memoized + referential stability / equal(a,b)
  selectedDeal = computed(() => {
    // const id = this.selectedDealId(); // auto-tracking!

    const deal = mockDeals.find((d) => d.id === this.selectedDealId()) as Deal;
    return deal;
  });

  selectDeal(id: string) {
    this.selectedDealId.set(id);
  }
}
