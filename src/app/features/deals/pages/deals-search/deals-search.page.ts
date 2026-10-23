import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  resource,
  Signal,
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
import { finalize, lastValueFrom } from 'rxjs';
import { useDealsResource } from '@feature/deals/data/injectables/useDealsResource';

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

        <button mat-stroked-button (click)="openDealCreator()">Create Deal</button>
      </div>

      <div class="grid gap-sm">
        @if (dealsResource.isLoading()) {
          Loading Deals
        } @else if (dealsResource.error()) {
          Error Loading Deals
        } @else {
          <app-deal-items-list
            [items]="dealsResource.value()"
            [(selectedId)]="selectedDealId"
            (selectedIdChange)="selectDeal($event)"
          />
        }
      </div>

      <div class="grid gap-sm">
        @let activeMode = mode();

        @if (selectedDeal.isLoading()) {
          Deal is loading
        }

        @switch (activeMode) {
          @case ('details') {
            <app-deal-details-card [deal]="selectedDeal.value()" (edit)="editDeal()" />
          }
          @case ('editor') {
            @if (selectedDeal.hasValue()) {
              <app-deal-editor
                [deal]="selectedDeal.value()"
                (cancel)="closeEditor()"
                (save)="saveDeal($event)"
              />
            }
          }
          @case ('creator') {
            <app-deal-editor (cancel)="closeEditor()" (save)="createDeal($event)" />
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
  createDeal($event: Deal) {
    throw new Error('Method not implemented.');
  }
  mode = signal<'details' | 'editor' | 'creator'>('details');

  selectedDealId = signal('');

  dealsList = signal<Deal[]>([]);

  // selectedDeal = signal<Deal | undefined>(undefined);

  api = inject(DealsAPI);

  dealsFilter = signal('');
  dealsResource = useDealsResource(this.dealsFilter);
  // tasksResource = useTasksResource(this.dealsFilter);

  selectedDeal = resource({
    params: () => {
      const id = this.selectedDealId();
      if (!id) return;
      return { id };
    },
    loader: ({ params: { id } }) => lastValueFrom(this.api.fetchDealById(id)),
  });

  openDealCreator() {
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
    // this.dealsList.update((list) => {
    //   return list.map((d) => (d.id === draft.id ? draft : d));
    // });

    this.mode.set('details');
  }

  closeEditor() {
    this.mode.set('details');
  }
}
