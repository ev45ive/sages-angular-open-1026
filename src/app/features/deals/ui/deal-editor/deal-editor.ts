import { Component, effect, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
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
        <mat-label>Title</mat-label>
        <input type="text" matInput [ngModel]="deal().title" required #titleModelREf="ngModel" />

        <mat-hint align="end"> {{ titleModelREf.value.length }} / 100 </mat-hint>
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

  titleModelREf = viewChild<NgModel>('titleModelREf');

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  submit() {
    const title = this.titleModelREf();

    const draft: Deal = {
      ...this.deal(),
      title: title?.value,
    };

    this.save.emit(draft);
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
