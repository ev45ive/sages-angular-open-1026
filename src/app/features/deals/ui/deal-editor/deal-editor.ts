import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';

@Component({
  imports: [],
  selector: 'app-deal-editor',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-5 p-5">
      <h2 class="text-xl">Edit Deal</h2>

      <input
        class="p-3 bg-surface-bright border"
        type="text"
        [value]="draft().title"
        (input)="draft().title = $event.target.value"
      />
      <!-- ^- Mutating original signal value -> no .set(). -> same Ref -> no updates! -->

      <p>{{ draft().title.length }} / 100</p>

      <button (click)="submit()">Save</button>
    </div>
  `,
})
export class DealEditor {
  
  deal = input<Deal>();
  
  draft = linkedSignal(() => ({ ...(this.deal() ?? emptyDealDraft()) }));

  // draft = signal<Deal>(emptyDealDraft());

  // Do not use effect to sync signals -> Change detection cascade
  // _copy = effect(() => {
  //   this.draft.set(this.deal() ? { ...this.deal()! } : this.draft());
  // });

  save = output<Deal>();

  submit() {
    this.save.emit(this.draft());
  }
}

export function emptyDealDraft(): Deal {
  return {
    id: '',
    title: '',
    description: '',
    stage: 'new',
    value: 0,
    contactName: '',
    public: false,
  };
}
