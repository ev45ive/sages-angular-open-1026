import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Deal } from '@feature/deals/model/deal';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-deal-items-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-sm">
      @for (deal of items(); track deal.id) {
        <div class="flex items-center bg-surface-container px-3 py-4 gap-2">
          <div class="grow">
            <strong>{{ deal.title }}</strong>
            <p>
              {{ deal.value | currency }}
            </p>
          </div>
          <div>
            {{ deal.stage }}
          </div>
        </div>
      } @empty {
        <div class="flex items-center justify-center bg-surface-container px-3 py-4 gap-2">
          No deals found
        </div>
      }
    </div>
  `,
})
export class DealItemsList {
  items = input<Deal[]>([]);

  // formatMOney() ..
}
