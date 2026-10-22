import { Component, input, output } from '@angular/core';
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
        [value]="deal().title"
        (input)="deal().title = $event.target.value"
      />
      <!-- ^- Mutating original signal value -> no .set(). -> same Ref -> no updates! -->

      <p>{{ deal().title.length }} / 100</p>
    </div>
  `,
})
export class DealEditor {
  deal = input.required<Deal>();

  save = output<Deal>();

  submit() {
    this.save.emit(this.deal());
  }
}
