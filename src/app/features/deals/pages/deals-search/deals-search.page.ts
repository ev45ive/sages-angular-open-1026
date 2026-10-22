import { Component, computed, signal } from '@angular/core';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';
import { DealItemsList } from '@feature/deals/ui/deal-items-list/deal-items-list';

@Component({
  imports: [DealDetailsCard, DealItemsList],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <p>deals-search works!</p>

    <!-- Effect - Consumer  -->
    <!-- <h1>{{ selectedDeal().title }}</h1> -->

    <!-- .grid.grid-cols-2.gap-md>.grid.gap-md*2 -->
    <div class="grid sm:grid-cols-[minmax(200px,1fr)_2fr] gap-md">
      <!--  -->
      <h1 class="text-2xl leading-loose col-span-full">Deals</h1>
      
      <div class="grid gap-sm">
        <app-deal-items-list />
      </div>
      <div class="grid gap-sm">
        <app-deal-details-card [deal]="selectedDeal()" />
      </div>

    </div>

    <!-- Child component -->

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
