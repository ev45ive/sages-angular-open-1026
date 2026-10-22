import { Component, input } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';
import { NgForOf } from '../../../../../../node_modules/@angular/common/types/_common_module-chunk';

@Component({
  imports: [NgForOf],
  selector: 'app-deal-items-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-sm">
      <div class="flex items-center bg-surface-container px-3 py-4 gap-2">
        <div class="grow">
          <strong>Item 11</strong>
          <p>Testing</p>
        </div>
        <div>Negotiation</div>
      </div>
      <div class="flex items-center bg-surface-container px-3 py-4 gap-2">
        <div class="grow">
          <strong>Item 21</strong>
          <p>Testing</p>
        </div>
        <div>Negotiation</div>
      </div>

      <div
        class="flex items-center bg-surface-container px-3 py-4 gap-2"
        *ngFor="let item of items()"
      >
        <div class="grow">
          <strong>Item 31</strong>
          <p>Testing</p>
        </div>
        <div>Negotiation</div>
      </div>
    </div>
  `,
})
export class DealItemsList {
  items = input<Deal[]>([]);
}
