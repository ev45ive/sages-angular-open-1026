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
 * @snippet [info-grid](/.vscode/shared-components.code-snippets#L2)
 * @owner Mateusz Kulesza <mateusz@sages.oi>
 * @see [InfoGridItem](./info-item.ts)
 */
@Component({
  selector: 'app-info-grid',
  host: { class: 'block @container mt-5' },
  template: `<div class="grid @md:grid-cols-3 gap-4"><ng-content /></div>`,
})
export class InfoGrid {}

/* 
    [app-info-grid]{
        @container mt-5;
    }
    [app-info-grid] > div{
        grid @sm:grid-cols-3 gap-4;
    }
*/
