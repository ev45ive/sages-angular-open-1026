import { Component } from '@angular/core';
import { DealDetailsCard } from '../../ui/deal-details-card/deal-details-card';

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
export class DealsSearchPage {}
