import { JsonPipe } from '@angular/common';
import { Component, effect, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModel } from '@angular/forms';
import { Deal } from '@feature/deals/model/deal';
import { SharedForms /* SharedModule */ } from '@shared/ui';

@Component({
  imports: [SharedForms, JsonPipe],
  selector: 'app-deal-editor',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <form #formRef="ngForm">
      <div class="grid gap-5 p-5">
        <h2 class="text-xl">Edit Deal</h2>
        <!-- <input class="p-3 bg-surface-bright border" type="text" [(ngModel)]="draft().title" /> -->
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input
            type="text"
            matInput
            [ngModel]="deal().title"
            required
            #titleModelREf="ngModel"
            name="title"
          />
          <mat-hint align="end"> {{ titleModelREf.value?.length }} / 100 </mat-hint>
          <mat-error>
            @if (titleModelREf.getError('required')) {
              Field is required
            }
          </mat-error>
        </mat-form-field>

        <div ngModelGroup="extrasy">
          <input type="text" ngModel name="tajne" value="tajne" />
          <input type="text" ngModel name="tajne1" value="tajne" />
          <div ngModelGroup="extrasy">
            <input type="text" ngModel name="tajne" value="tajne" />
            <input type="text" ngModel name="tajne1" value="tajne" />
          </div>
        </div>

        <div class="flex justify-end gap-md">
          <button (click)="submit()">Save</button>
          <button mat-flat-button (click)="onCancel()">Cancel</button>
        </div>
      </div>

      <pre>{{ formRef.value | json }}</pre>
    </form>
  `,
})
export class DealEditor {
  deal = input<Deal>(emptyDealDraft());

  // titleModelREf = viewChild.required<NgModel>('titleModelREf');
  // formRef = viewChild.required<NgForm>('formRef');
  // formRef = viewChild.required(NgForm);

  formRef = viewChild.required(ControlContainer);

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  submit() {
    const form = this.formRef();

    const draft: Deal = {
      ...this.deal(),
      ...form.value,
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
