import { Component, input, output, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';

@Component({
  imports: [MatAnchor],
  selector: 'app-deal-details-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    @if (deal(); as deal) {
      <article class="rounded-md bg-surface-container-lowest p-5 shadow-level1">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-title-md text-on-surface">
              {{ deal.title }}
            </h2>
            <p class="mt-1 text-body-md text-on-surface-variant">
              {{ deal.description }}
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-3">
 
          <!-- Czy wydzielamy?  -->
          
          <!-- Kto jest właścicielem? feature/deals vs shared/ui  -->
           
          <!-- Kto jest właścicielem prezentacji badge?  shared/ui  -->
          <!-- Kto jest właścicielem prezentacji deal stage? feature/deals vs  -->

          <!-- Kto zmienia deal.stage - Parent? input() -->
           
          <!-- Kto zmienia deal stages colors  -->

            <span
              class="rounded-full px-3 py-1 text-label-md "

              [class]="{
                'bg-amber-400': deal.stage === 'new',
                'bg-green-400': deal.stage === 'proposal',
                'bg-red-400': deal.stage === 'negotiation',
              }"
            >
              {{ deal.stage }}
            </span>

            <!-- ==== -->
            <button type="button" mat-raised-button (click)="onEdit()">Edit</button>
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
              {{ deal.public ? 'Yes' : 'No' }}
            </dd>
          </div>
        </dl>
      </article>
    } @else {
      <div class="px-3 py-4 text-center">No deal selected</div>
    }
  `,
})
export class DealDetailsCard {
  deal = input<Deal>();

  edit = output();

  onEdit() {
    this.edit.emit();
  }

  // TODO: Emit!
}
