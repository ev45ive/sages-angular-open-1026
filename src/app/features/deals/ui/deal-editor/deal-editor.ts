import { Component, input, output, signal } from '@angular/core';
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
    </div>
  `,
})
export class DealEditor {
  deal = input<Deal>();

  draft = signal<Deal>(emptyDealDraft());

  ngOnInit() {
    // Set Draft - edit or new
    
    // const copy = {...this.deal()} // shallow copy

    const copy = structuredClone(this.deal()); // deep copy

    this.draft.set(copy ?? emptyDealDraft());
  }

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
