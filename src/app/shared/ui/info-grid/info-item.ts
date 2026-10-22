import { Component, input } from '@angular/core';

/**
 * Label/value pair. The `label` input or a `[info-label]` element renders the label; the `value` input or projected content renders the value.
 *
 * @example
 * ```html
 * <app-info-item label="Value" value="$48,000" />
 * ```
 *
 * @example
 * ```html
 * <app-info-item value="Anna Kowalska">
 *   <span info-label>Contact</span>
 * </app-info-item>
 * ```
 *
 * @example
 * ```html
 * <app-info-item label="Public">{{ deal.public ? 'Yes' : 'No' }}</app-info-item>
 * ```
 *
 * @example
 * ```html
 * <app-info-grid>
 *   <app-info-item label="Value" value="$48,000" />
 *   <app-info-item label="Contact" value="Anna Kowalska" />
 * </app-info-grid>
 * ```
 *
 * @snippet [info-item](.vscode/shared-components.code-snippets#L13)
 * @snippet [info-item-label](.vscode/shared-components.code-snippets#L21)
 * @snippet [info-item-value](.vscode/shared-components.code-snippets#L31)
 * 
 * @owner Mateusz Kulesza <mateusz@sages.oi>
 * @see [InfoGrid](./info-grid.ts)
 */
@Component({
  selector: 'app-info-item',
  template: `
    <div class="text-label-lg text-on-surface">
      <ng-content select="[info-label]">{{ label() }}</ng-content>
    </div>
    <div class="mt-1 text-body-lg text-on-surface">
      <ng-content>{{ value() }}</ng-content>
    </div>
  `,
})
export class InfoItem {
  label = input<string | null>();
  value = input<string | null>();
}
