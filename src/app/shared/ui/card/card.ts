import { Component, computed, contentChild, input } from '@angular/core';
import { UiCardActions } from './card-actions';
import { UiCardBadge } from './card-badge';
import { HeadingLevel, UiCardHeader } from './card-header';

/**
 * Card with optional header and body. Root `title`, `subtitle`, `[ui-card-actions]` and `[ui-card-badge]`
 * build a default header; an explicit `ui-card-header` replaces it and hides root header content.
 *
 * @example
 * ```html
 * <ui-card [title]="deal.title" [subtitle]="deal.description">
 *   <button ui-card-actions type="button">Edit</button>
 *   <app-info-grid>...</app-info-grid>
 * </ui-card>
 * ```
 */
@Component({
  selector: 'ui-card',
  host: { class: 'block' },
  imports: [UiCardHeader],
  template: `
    <article class="flex flex-col gap-4 rounded-md bg-surface-container-lowest p-5 shadow-level1">
      <ng-content select="ui-card-header,[ui-card-header]">
        <ui-card-header [title]="title()" [subtitle]="subtitle()" [headingLevel]="headingLevel()">
          <ng-content ui-card-badge select="[ui-card-badge]" />
          <ng-content ui-card-actions select="[ui-card-actions]" />
        </ui-card-header>
      </ng-content>
      <div>
        <ng-content />
      </div>

      <div class="flex gap-5 justify-end empty:none">
        <ng-content select="ui-card-footer, [ui-card-footer]"> </ng-content>
      </div>
    </article>
  `,
})
export class UiCard {
  title = input<string>();
  subtitle = input<string>();
  headingLevel = input<HeadingLevel>(2);

  private readonly explicitHeader = contentChild(UiCardHeader, { descendants: false });
  private readonly actions = contentChild(UiCardActions, { descendants: false });
  private readonly badge = contentChild(UiCardBadge, { descendants: false });

  protected readonly showDefaultHeader = computed(
    () =>
      !this.explicitHeader() &&
      !!(this.title() || this.subtitle() || this.actions() || this.badge()),
  );
}
