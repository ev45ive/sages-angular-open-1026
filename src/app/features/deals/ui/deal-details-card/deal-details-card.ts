import { Component, input, output, signal } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { mockDeals } from '@feature/deals/data/mock-deals';
import { Deal } from '@feature/deals/model/deal';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { InfoItem } from '@shared/ui/info-grid/info-item';
import { UiCard } from '@shared/ui/card/card';
import { UiCardActions } from '@shared/ui/card/card-actions';
import { UiCardBadge } from '@shared/ui/card/card-badge';
import { DealStageBadge } from '../deal-stage-badge/deal-stage-badge';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [MatAnchor, DealStageBadge, InfoGrid, InfoItem, CurrencyPipe, UiCard, UiCardActions, UiCardBadge],
  selector: 'app-deal-details-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    @if (deal(); as deal) {
      <ui-card [title]="deal.title" [subtitle]="deal.description">
        <app-deal-stage-badge ui-card-badge [stage]="deal.stage" />
        <button ui-card-actions type="button" mat-raised-button (click)="onEdit()">Edit</button>
        <!-- <button ui-card-footer type="button" mat-raised-button (click)="onEdit()">Edit</button> -->

        <app-info-grid>
          <app-info-item label="Value" [value]="deal.value | currency" />
          <app-info-item label="Contact" value="Anna Kowalska" />
          <app-info-item label="Public">{{ deal.public ? 'Yes' : 'No' }}</app-info-item>
        </app-info-grid>
      </ui-card>
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
