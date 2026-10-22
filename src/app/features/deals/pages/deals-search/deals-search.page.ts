import { Component, computed, signal } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';
import { DealItemsList } from '@feature/deals/ui/deal-items-list/deal-items-list';
import { ExhaustivePipe } from '@shared/pipes/exhaustive-pipe';

@Component({
  imports: [DealDetailsCard, DealItemsList, ExhaustivePipe, MatButton],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <!-- <button mat-stroked-button>Create Deal</button>
    <button mat-raised-button>Create Deal</button>
    <button mat-flat-button>Create Deal</button> -->

    <!-- .grid.grid-cols-2.gap-md>.grid.gap-md*2 -->
    <div class="grid sm:grid-cols-[minmax(200px,1fr)_2fr] gap-md">
      <div class="flex justify-between col-span-full">
        <h1 class="text-2xl leading-loose ">Deals</h1>

        <button mat-stroked-button (click)="createDeal()">Create Deal</button>
      </div>

      <div class="grid gap-sm">
        <app-deal-items-list [items]="dealsList()" (selectionChanged)="selectDeal($event)" />
      </div>

      <div class="grid gap-sm">
        @let activeMode = mode();

        @switch (activeMode) {
          @case ('details') {
            <app-deal-details-card [deal]="selectedDeal()" />
            <button mat-flat-button>Edit</button>
          }
          @case ('editor') {
            <!--  -->
            edit mode
            <button mat-flat-button>Cancel</button>
          }
          @case ('creator') {
            <!--  -->
            Create mode
            <button mat-flat-button>Cancel</button>
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
  dealsList = signal<Deal[]>(mockDeals);

  // selectedDeal = signal<Deal>(mockDeals[0]);
  selectedDeal = computed(() => {
    // const id = this.selectedDealId(); // auto-tracking!
    const deal = this.dealsList().find((d) => d.id === this.selectedDealId());
    return deal;
  });

  createDeal() {
    this.mode.set('creator');
  }

  editDeal() {
    this.mode.set('editor');
  }

  selectDeal(id: string) {
    this.mode.set('details');
    this.selectedDealId.set(id);
  }
}
