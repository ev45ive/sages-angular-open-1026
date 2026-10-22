import { Component, input, output, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { InfoItem } from '@shared/ui/info-grid/info-item';
import { DealStageBadge } from '../deal-stage-badge/deal-stage-badge';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [MatAnchor, DealStageBadge, InfoGrid, InfoItem, CurrencyPipe],
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
            <app-deal-stage-badge [stage]="deal.stage" />

            <button type="button" mat-raised-button (click)="onEdit()">Edit</button>
          </div>
        </div>
        <app-info-grid>
          <app-info-item label="Value" [value]="deal.value | currency" />
          <app-info-item label="Contact" value="Anna Kowalska" />
          <app-info-item label="Public">{{ deal.public ? 'Yes' : 'No' }}</app-info-item>
        </app-info-grid>
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
