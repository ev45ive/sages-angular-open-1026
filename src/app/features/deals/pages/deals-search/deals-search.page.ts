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
import { EMPTY, finalize, lastValueFrom } from 'rxjs';
import { useDealsResource } from '@feature/deals/data/injectables/useDealsResource';
import { httpResource } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { SharedUI } from '@shared/index';

@Component({
  imports: [DealDetailsCard, DealItemsList, ExhaustivePipe, SharedUI, DealEditor],
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
        } @else if (dealsResource.hasValue()) {
          <app-deal-items-list
            [items]="dealsResource.value()"
            [(selectedId)]="selectedDealId"
            (selectedIdChange)="selectDeal($event)"
          />
        }
      </div>

      <div class="grid gap-sm">
        @let activeMode = mode();

        @if (dealResource.isLoading()) {
          Deal is loading
        }

        @switch (activeMode) {
          @case ('details') {
            {{ dealResource.value() | json }}
            <app-deal-details-card [deal]="dealResource.value()" (edit)="editDeal()" />
          }
          @case ('editor') {
            <app-deal-editor
              [deal]="dealResource.value()"
              (cancel)="closeEditor()"
              (save)="saveDeal($event)"
            />
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
  mode = signal<'details' | 'editor' | 'creator'>('details');

  selectedDealId = signal('');

  api = inject(DealsAPI);

  dealsFilter = signal('');

  dealsResource = rxResource({
    params: () => this.dealsFilter(),
    stream: ({ params }) => this.api.fetchDeals(params),
  });

  dealResource = rxResource({
    params: () => this.selectedDealId() || undefined,
    stream: ({ params: id }) => this.api.fetchDealById(id),
  });

  createDeal($event: Deal) {
    this.dealResource.set(undefined);

    throw new Error('Method not implemented.');
  }

  openDealCreator() {
    this.dealResource.set(undefined);
    this.mode.set('editor');
  }

  selectDeal(id: string) {
    this.mode.set('details');
    this.selectedDealId.set(id);
  }

  editDeal() {
    this.mode.set('editor');
  }

  saveDeal(draft: Deal) {
    this.mode.set('details');
  }

  closeEditor() {
    this.mode.set('details');
  }
}
