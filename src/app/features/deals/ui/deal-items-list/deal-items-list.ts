import { Component, input } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';

@Component({
  imports: [],
  selector: 'app-deal-items-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` 

    <!-- .grid.gap-sm>.flex.gap-2*3>.grow>strong{Item $1}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.px-2.py-3.gap-2*3>.grow>strong{Item $1}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.px-2.py-4.gap-2*3>.grow>strong{Item $1}+p{Testing}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.bg-slate-700.px-2.py-4.gap-2*3>.grow>strong{Item $1}+p{Testing}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.bg-surface-container.px-2.py-4.gap-2*3>.grow>strong{Item $1}+p{Testing}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.bg-surface-container.px-3.py-4.gap-2*3>.grow>strong{Item $1}+p{Testing}^div>{Negotiation} -->
    <!-- .grid.gap-sm>.flex.items-center.bg-surface-container.px-3.py-4.gap-2*3>.grow>strong{Item $1}+p{Testing}^div>{Negotiation} -->
    
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
      <div class="flex items-center bg-surface-container px-3 py-4 gap-2">
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
