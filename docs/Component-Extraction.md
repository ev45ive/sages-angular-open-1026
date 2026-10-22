
# Badge - warianty podziału ról

Zasada: `app-badge` (prezentacja, właściciel: design system) nie zna domeny. Mapowanie etap -> wygląd (właściciel: domena Deals) jest poza nim.

## 1. Promo hardcoded

```ts
@Component({
  selector: 'app-promo-badge',
  template: `<span class="rounded-full px-3 py-1 text-label-md bg-amber-400">Promo</span>`,
})
export class PromoBadge {}
```

- Plus: najprostsze.
- Minus: duplikacja, każdy wariant to osobny komponent.

## 2. Badge + ng-content

```html
<app-badge class="bg-amber-400">Promo</app-badge>
```

- Plus: badge czysto prezentacyjny, treść podaje wywołujący.
- Minus: wywołujący zna klasy CSS, kolory rozjeżdżają się po aplikacji.

## 3. Badge + variant + stage (mapowanie w rodzicu)

```ts
// badge (design system)
export type BadgeVariant = 'warning' | 'success' | 'danger' | 'promo';

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  warning: 'bg-amber-400',
  success: 'bg-green-400',
  danger: 'bg-red-400',
  promo: 'bg-amber-400',
};

readonly variant = input.required<BadgeVariant>();
readonly cssClass = computed(() => VARIANT_CLASS[this.variant()]);
```

```html
<!-- badge.html -->
<span class="rounded-full px-3 py-1 text-label-md" [class]="cssClass()"><ng-content /></span>

<!-- rodzic (deals) -->
<app-badge [variant]="stageVariant(deal.stage)">{{ deal.stage }}</app-badge>
```

- Plus: badge zarządza wyglądem, domena zarządza mapowaniem.
- Minus: metoda `stageVariant` z `switch` nie gwarantuje kompletności bez `Record`.

## 4. deal-badge: input stage + wstrzyknięty słownik

```ts
// features/deals/ui (lub app.config.ts jako provider)
export const DEAL_STAGE_VARIANTS = new InjectionToken<Record<DealStage, BadgeVariant>>('DEAL_STAGE_VARIANTS');

// app.config.ts
{ provide: DEAL_STAGE_VARIANTS, useValue: { new: 'warning', proposal: 'success', negotiation: 'danger' } }

@Component({
  selector: 'app-deal-badge',
  template: `<app-badge [variant]="variants[stage()]">{{ stage() }}</app-badge>`,
})
export class DealBadge {
  readonly stage = input.required<DealStage>();
  protected readonly variants = inject(DEAL_STAGE_VARIANTS);
}
```

```html
<app-deal-badge [stage]="deal.stage" />
```

- Plus: mapowanie w domenie Deals, podmienialne (testy, inny motyw), kompletność wymuszona typem.
- Minus: więcej plików i DI, przerost dla jednego miejsca.

## Rekomendacja

- Jedno miejsce użycia: wariant 3.
- Mapowanie etapów używane w wielu miejscach: wariant 4.
- Wariant 1 i 2 tylko do prototypu.
