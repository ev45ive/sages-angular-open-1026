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
  selectedDeal1 = computed(
    () => {
      console.log('Searching for ' + this.selectedDealId() + ' filter:' + this.filter());

      const id = this.selectedDealId(); // auto-tracking!

      this.filter(); // tracking

      const deal = mockDeals.find((d) => d.id === this.selectedDealId()) as Deal;

      deal.public = false; // Mutation
      return deal // same ref -> no update -> stale View

      // return { ...deal, public: false }; // Shallow copy - new obj ref -> same keys refs
    },
    // { equal: (a, b) => a === b }, // When to clear cache! // default to reference equals ===
  );

  selectedDeal = computed(() => {
    console.log('Transforming for ' + this.selectedDeal1().id);
    return this.selectedDeal1();
  });

  selectDeal(id: string) {
    // Update + Notify!
    this.selectedDealId.set(id);

    // this.selectedDeal.set(mockDeals[0]); // computed is read-only
  }
}
