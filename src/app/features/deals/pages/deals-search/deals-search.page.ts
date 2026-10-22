import { Component, signal } from '@angular/core';
import { mockDeals } from '@feature/deals/data/mock-deals';
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

    <app-deal-details-card />
  `,
})
export class DealsSearchPage {
  deal = signal(mockDeals[1]);
}
