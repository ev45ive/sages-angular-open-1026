import { Component } from '@angular/core';

/**
 * Layout wrapper that arranges `app-info-item` children in a three-column grid.
 *
 * @example
 * ```html
 * <app-info-grid>
 *   <app-info-item label="Value" value="$48,000" />
 *   <app-info-item label="Contact" value="Anna Kowalska" />
 * </app-info-grid>
 * ```
 * 
 * @owner Mateusz Kulesza <mateusz@sages.oi>
 * @see [InfoGridItem](./info-item.ts)
 */
@Component({
  selector: 'app-info-grid',
  host: { class: 'mt-5 grid grid-cols-3 gap-4' },
  template: `<ng-content />`,
})
export class InfoGrid {}
