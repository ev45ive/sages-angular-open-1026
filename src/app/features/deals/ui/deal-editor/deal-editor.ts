import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { Deal } from '@feature/deals/model/deal';
import { SharedForms /* SharedModule */ } from '@shared/ui';

@Component({
  imports: [SharedForms],
  selector: 'app-deal-editor',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-5 p-5">
      <h2 class="text-xl">Edit Deal</h2>

      <!-- <input class="p-3 bg-surface-bright border" type="text" [(ngModel)]="draft().title" /> -->
      
      <mat-form-field>
        <input type="text" matInput [(ngModel)]="draft().title" required #titleModelREf="ngModel" />
        <mat-label>Title</mat-label>
        <mat-hint align="end"> {{ draft().title.length }} / 100 </mat-hint>
        <mat-error>
          @if (titleModelREf.getError('required')) {
            Field is required
          }
        </mat-error>
      </mat-form-field>

      <div class="flex justify-end gap-md">
        <button (click)="submit()">Save</button>
        <button mat-flat-button (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `,
})
export class DealEditor {
  deal = input<Deal>(emptyDealDraft());

  draft = linkedSignal(() => {
    if (!this.deal()) return emptyDealDraft();
    return { ...this.deal() };
  });

  // Individual field signals
  title = linkedSignal(() => this.draft().title);
  value = linkedSignal(() => this.draft().value);
  // ...

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  submit() {
    const draft = {
      ...this.draft(),
      title: this.title(),
      value: this.value(),
    };

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
