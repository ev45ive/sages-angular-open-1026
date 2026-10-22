import { Component, computed, input, signal } from '@angular/core';
import { DealStage } from '@feature/deals/model/deal';
import { single } from 'rxjs';

export const DealStageConfig: Record<DealStage, { label: string; class: string }> = {
  new: { label: 'New', class: 'bg-amber-400' },
  proposal: { label: 'Proposal', class: 'bg-blue-400' },
  negotiation: { label: 'Negotiation', class: 'bg-red-400' },
  'closed-lost': { label: 'Closed (Lost)', class: 'bg-gray-400' },
  'closed-won': { label: 'Closed (Won)', class: 'bg-green-500' },
} as const;

@Component({
  imports: [],
  selector: 'app-deal-stage-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <span class="rounded px-3 py-1 text-label-md " [class]="stageConfig().class">
    {{ stageConfig().label }}
  </span>`,
})
export class DealStageBadge {
  public readonly stage = input.required<DealStage>();

  // TODO: Fetch config from API
  protected readonly dynamicConfig = signal(DealStageConfig);

  protected readonly stageConfig = computed(() => {
    const configs = this.dynamicConfig();
    
    // if(!configs) // Not loaded yet!

    return configs[this.stage()];
  });
}
