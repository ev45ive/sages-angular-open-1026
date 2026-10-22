import { Component, computed, signal } from '@angular/core';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';
import { DealItemsList } from '@feature/deals/ui/deal-items-list/deal-items-list';
import { ExhaustivePipe } from '@shared/pipes/exhaustive-pipe';

@Component({
  imports: [DealDetailsCard, DealItemsList, ExhaustivePipe],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <!-- Effect - Consumer  -->
    <!-- <h1>{{ selectedDeal().title }}</h1> -->

    <!-- .grid.grid-cols-2.gap-md>.grid.gap-md*2 -->
    <div class="grid sm:grid-cols-[minmax(200px,1fr)_2fr] gap-md">
      <h1 class="text-2xl leading-loose col-span-full">Deals</h1>

      <div class="grid gap-sm">
        <app-deal-items-list [items]="dealsList()" />
      </div>

      <div class="grid gap-sm">
        @let activeMode = mode();

        @switch (activeMode) {
          @case ('details') {
            <app-deal-details-card [deal]="selectedDeal()" />
          }
          @case ('editor') {
            <!--  -->
          }
          @case ('creator') {
            <!--  -->
          }
          @default {
            {{ activeMode | exhaustive: 'Invalid Mode :' + activeMode }}
          }
        }
      </div>
    </div>
  `,
})
export class DealsSearchPage {
  mode = signal<'details' | 'editor' | 'creator'>('details');

  selectedDealId = signal('d2');
  dealsList = signal<Deal[]>([]);

  // selectedDeal = signal<Deal>(mockDeals[0]);

  selectedDeal = computed(() => {
    // const id = this.selectedDealId(); // auto-tracking!

    const deal = this.dealsList().find((d) => d.id === this.selectedDealId());

    return deal;
  });

  selectDeal(id: string) {
    this.selectedDealId.set(id);
  }
}
