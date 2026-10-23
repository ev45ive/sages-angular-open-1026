import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { DealDetailsCard } from '@feature/deals/ui/deal-details-card/deal-details-card';
import { DealItemsList } from '@feature/deals/ui/deal-items-list/deal-items-list';
import { ExhaustivePipe } from '@shared/pipes/exhaustive-pipe';
import { DealEditor } from '@feature/deals/ui/deal-editor/deal-editor';
import { DealsAPI } from '@feature/deals/data/deals-api/deals-api';

@Component({
  imports: [DealDetailsCard, DealItemsList, ExhaustivePipe, MatButton, DealEditor],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid sm:grid-cols-[minmax(200px,1fr)_2fr] gap-md">
      <div class="flex justify-between col-span-full">
        <h1 class="text-2xl leading-loose ">Deals</h1>

        <button mat-stroked-button (click)="createDeal()">Create Deal</button>
      </div>

      <div class="grid gap-sm">
        <app-deal-items-list
          [items]="dealsList()"
          [(selectedId)]="selectedDealId"
          (selectedIdChange)="selectDeal($event)"
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
              <app-deal-editor [deal]="deal" (cancel)="closeEditor()" (save)="saveDeal($event)" />
            }
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

  selectedDealId = signal('');

  dealsList = signal<Deal[]>([]);

  selectedDeal = signal<Deal | undefined>(undefined);

  // TODO: Factory/Builder / Service Injector
  // api = new DealsApi(new Auth( API_URL ))

  api = inject(DealsAPI);

  loadingDeals = effect((onCleanup) => {
    // Consumer - component/route/action...

    // Cancelling fetch
    const huston = new AbortController();
    onCleanup(() => huston.abort('Cancelled'));

    this.api
      .fetchDeals('', { signal: huston.signal })
      .then((data) => this.dealsList.set(data))
      .catch((error) => console.log(error) /* Cancelled? */);
  });

  // Eager + tracking + Async + onCleanup!
  loadDeal$ = effect((onCleanup) => {
    const id = this.selectedDealId();
    if (!id) return;

    this.dealsList();

    console.log('Request ' + id);

    const handler = setTimeout(() => {
      console.log('Response ' + id);
      const deal = this.dealsList().find((d) => d.id === id);
      this.selectedDeal.set(deal);
    }, 100 * Math.random());

    // Abort previous request
    onCleanup(() => {
      console.log('Aborting Request ' + id);

      clearTimeout(handler);
    });
  });

  // ---

  createDeal() {
    this.mode.set('creator');
  }

  selectDeal(id: string) {
    // this.mode.set('details');
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
