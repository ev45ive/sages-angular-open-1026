import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';
import { DealItemsList } from '@feature/deals/ui/deal-items-list/deal-items-list';
import { ExhaustivePipe } from '@shared/pipes/exhaustive-pipe';
import { DealEditor } from '@feature/deals/ui/deal-editor/deal-editor';

@Component({
  imports: [DealDetailsCard, DealItemsList, ExhaustivePipe, MatButton, DealEditor],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush, // Default v22+
  template: `
    <div class="grid sm:grid-cols-[minmax(200px,1fr)_2fr] gap-md">
      <div class="flex justify-between col-span-full">
        <h1 class="text-2xl leading-loose ">Deals</h1>

        <button mat-stroked-button (click)="createDeal()">Create Deal</button>
      </div>

      <div class="grid gap-sm">
        <app-deal-items-list
          [items]="dealsList()"
          [selectedId]="selectedDealId()"
          (selectionChanged)="selectDeal($event)"
        />
      </div>

      <div class="grid gap-sm">
        @let activeMode = mode();

        @switch (activeMode) {
          @case ('details') {
            <app-deal-details-card [deal]="selectedDeal()" (edit)="editDeal()" />
          }
          @case ('editor') {
            <!--  -->

            @if (selectedDeal(); as deal) {
              <app-deal-editor [deal]="deal" (save)="saveDeal($event)" />
            }

            <button mat-flat-button (click)="closeEditor()">Cancel</button>
          }
          @case ('creator') {
            <!--  -->
            Create mode
            <button mat-flat-button (click)="closeEditor()">Cancel</button>
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
  // dealsList = signal<ReadonlyArray<Deal>>(mockDeals);

  // selectedDeal = signal<Deal>(mockDeals[0]);
  selectedDeal = computed(() => {
    // const id = this.selectedDealId(); // auto-tracking!
    const deal = this.dealsList().find((d) => d.id === this.selectedDealId());
    return deal;
  });

  // ---

  // cdr = inject(ChangeDetectorRef)

  createDeal() {
    this.mode.set('creator');

    // fetch / timeout / asnyc
    // this.cdr.detectChanges() // manual change detection
  }

  selectDeal(id: string) {
    this.mode.set('details');
    this.selectedDealId.set(id);
  }

  editDeal() {
    this.mode.set('editor');
  }

  saveDeal(draft: Deal) {
    
    this.dealsList.update((list) => {
      return list.map((d) => (d.id === draft.id ? draft : d));
    });

    this.mode.set('details');
  }

  closeEditor() {
    this.mode.set('details');
  }
}
