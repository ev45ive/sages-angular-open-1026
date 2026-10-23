import { Component, computed, input } from '@angular/core';
import { DealStage } from '@feature/deals/model/deal';
import { DealStageLabel } from '@feature/deals/model/deal-stage-config';

@Component({
  imports: [],
  selector: 'app-deal-stage-badge',
  host: { '[attr.data-deal-stage]': 'stage()' },
  styles: `
    :host {
      display: block;
    }

    :host([data-deal-stage='new']) .deal-stage-pill {
      background-color: var(--color-amber-400);
    }

    :host([data-deal-stage='proposal']) .deal-stage-pill {
      background-color: var(--color-blue-400);
    }

    :host([data-deal-stage='negotiation']) .deal-stage-pill {
      background-color: var(--color-red-400);
    }

    :host([data-deal-stage='closed-lost']) .deal-stage-pill {
      background-color: var(--color-gray-400);
    }

    :host([data-deal-stage='closed-won']) .deal-stage-pill {
      background-color: var(--color-green-500);
    }
  `,
  template: ` <span class="deal-stage-pill rounded px-3 py-1 text-label-md">
    {{ label() }}
  </span>`,
})
export class DealStageBadge {
  public readonly stage = input.required<DealStage>();

  // TODO: Fetch labels from API
  protected readonly label = computed(() => DealStageLabel[this.stage()]);
}
