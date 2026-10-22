import { Component, input } from '@angular/core';
import { DealStage } from '@feature/deals/model/deal';

export const DealStageConfig: Record<DealStage, { label: string; class: string }> = {
  new: { label: 'New', class: 'bg-amber-400' },
  proposal: { label: 'Proposal', class: 'bg-blue-400' },
  negotiation: { label: 'Negotiation', class: 'bg-red-400' },
  'closed-lost': { label: 'Closed (Lost)', class: 'bg-gray-400' },
  'closed-won': { label: 'Closed (Won)', class: 'bg-green-500' },
};

@Component({
  imports: [],
  selector: 'app-deal-stage-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <span
    class="rounded px-3 py-1 text-label-md "
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
