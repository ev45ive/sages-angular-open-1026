import { Component, input, model, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Deal } from '@feature/deals/model/deal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { DealStageBadge } from '../deal-stage-badge/deal-stage-badge';

@Component({
  imports: [CurrencyPipe, DealStageBadge],
  selector: 'app-deal-items-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-sm">
      @for (deal of items(); track deal.id) {
        <button
          type="button"
          class="flex items-center text-start bg-surface-container px-3 py-4 gap-2 cursor-pointer"
          [class.bg-primary!]="deal.id === selectedId()"
          [class.text-on-primary!]="deal.id === selectedId()"
          (click)="selectItem(deal.id)"
          (keyup.ArrowUp)="moveSelection(-1)"
          (keyup.ArrowDown)="moveSelection(+1)"
        >
          <div class="grow">
            <strong>{{ deal.title }}</strong>
            <p>
              {{ deal.value | currency }}
            </p>
          </div>
          <div>
            <app-deal-stage-badge [stage]="deal.stage" />
          </div>
        </button>
      } @empty {
        <div class="flex items-center justify-center bg-surface-container px-3 py-4 gap-2">
          No deals found
        </div>
      }
    </div>
  `,
})
export class DealItemsList {
  // inputs+outputs -> Stateless / Controlled / Presentational component

  moveSelection(d: number) {
    const items = this.items();
    if (!items.length) return;
    const cursor = items.findIndex((i) => i.id === this.selectedId());
    const move = Math.min(Math.max(cursor + d, 0), items.length - 1);
    this.selectItem(items[move].id);
  }

  items = input<Deal[]>([]);

  selectedId = model<Deal['id']>('')

  // selectedId =       input<Deal['id']>();
  // selectedIdChange = output<Deal['id']>();

  // Event Emmitter -> (id) => $event

  selectItem(id: Deal['id']) {
    // this.selectedIdChange.emit(id);

    this.selectedId.set(id);
  }
}
