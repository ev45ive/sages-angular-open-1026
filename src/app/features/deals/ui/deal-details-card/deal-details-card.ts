import { Component, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';

@Component({
  imports: [MatAnchor],
  selector: 'app-deal-details-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <article class="rounded-md bg-surface-container-lowest p-5 shadow-level1">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-title-md text-on-surface">
            {{ deal().title }}
          </h2>
          <p class="mt-1 text-body-md text-on-surface-variant">
            Annual enterprise license for 50 seats. Awaiting legal review.
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-3">
          <span
            class="rounded-full bg-tertiary-container px-3 py-1 text-label-md text-on-tertiary-container"
            >negotiation</span
          >
          <button type="button" mat-raised-button>Edit</button>
        </div>
      </div>
      <dl class="mt-5 grid grid-cols-3 gap-4">
        <div>
          <dt class="text-label-lg text-on-surface">Value</dt>
          <dd class="mt-1 text-title-md text-on-surface">$48,000</dd>
        </div>
        <div>
          <dt class="text-label-lg text-on-surface">Contact</dt>
          <dd class="mt-1 text-body-lg text-on-surface">Anna Kowalska</dd>
        </div>
        <div>
          <dt class="text-label-lg text-on-surface">Public</dt>
          <dd class="mt-1 text-body-lg text-on-surface">
            {{ deal().public ? 'Yes' : 'No' }}
          </dd>
        </div>
      </dl>
    </article>
  `,
})
export class DealDetailsCard {
  deal = signal(mockDeals[1]);
}
