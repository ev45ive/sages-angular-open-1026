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

    <!-- Effect - Consumer  -->
    <h1>{{selectedDeal().title}}</h1>

    <!-- Child component -->
    <app-deal-details-card [deal]="selectedDeal()"/>

    <!-- <input [value]="deal().title"> -->
  `,
})
export class DealsSearchPage {
  
  // Owner
  selectedDeal = signal(mockDeals[1]);

  selectDeal(id:string){

    // Update + Notify!
    this.selectedDeal.set(mockDeals[0])
  }
}
