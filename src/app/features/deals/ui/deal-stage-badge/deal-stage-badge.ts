import { Component, input } from '@angular/core';
import { DealStage } from '@feature/deals/model/deal';

@Component({
  imports: [],
  selector: 'app-deal-stage-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <span
    class="rounded-full px-3 py-1 text-label-md "
    [class]="{
      'bg-amber-400': stage() === 'new',
      'bg-green-400': stage() === 'proposal',
      'bg-red-400': stage() === 'negotiation',
    }"
  >
    {{ stage() }}
  </span>`,
})
export class DealStageBadge {
  stage = input.required<DealStage>();
}
