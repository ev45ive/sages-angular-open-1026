import { Component, computed, input } from '@angular/core';
import { DealStage } from '@feature/deals/model/deal';
import { DealStageLabel } from '@feature/deals/model/deal-stage-config';

@Component({
  imports: [],
  selector: 'app-deal-stage-badge',
  styles: `
    :host {
      display: block;
      --badge-current-color: var(--color-gray-400);
    }

    /* ---- */

    :host .deal-stage-pill {
      background-color: var(--badge-current-color);
    }

    /* ---- */

    :host([data-deal-stage='new']) {
      --badge-current-color: var(--color-amber-400);
    }

    :host([data-deal-stage='proposal']) {
      --badge-current-color: var(--color-blue-400);
    }

    :host([data-deal-stage='negotiation']) {
      --badge-current-color: var(--color-red-400);
    }

    :host([data-deal-stage='closed-lost']) {
      --badge-current-color: var(--color-gray-400);
    }

    :host([data-deal-stage='closed-won']) {
      --badge-current-color: var(--color-green-500);
    }
  `,
  template: ` <span class="deal-stage-pill rounded px-3 py-1 text-label-md bg-(--badge-current-color)">
    {{ label() }}
  </span>`,
  // Reflect deal stage state as DOM [deal-data-stage]
  host: { '[attr.data-deal-stage]': 'stage()' },
})
export class DealStageBadge {
  public readonly stage = input.required<DealStage>();

  // TODO: Fetch labels from API
  protected readonly label = computed(() => DealStageLabel[this.stage()]);
}
