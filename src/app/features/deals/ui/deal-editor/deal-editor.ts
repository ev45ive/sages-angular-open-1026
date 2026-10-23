import { JsonPipe } from '@angular/common';
import { Component, effect, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
    <form [formGroup]="form">
      <div class="grid gap-5 p-5">
        <h2 class="text-xl">Edit Deal</h2>
        <!-- <input class="p-3 bg-surface-bright border" type="text" [(ngModel)]="draft().title" /> -->
        <mat-form-field>
          <mat-label>Title</mat-label>

          <input type="text" matInput formControlName="title" />

          <mat-hint align="end"> {{ form.get('title')?.value?.length }} / 100 </mat-hint>
          <mat-error>
            @if (form.get('title')?.getError('required')) {
              Field is required
            }
            @if (form.get('title')?.getError('censor'); as error) {
              Cannot contain bad word "{{ error.censor }}"
            }
          </mat-error>
        </mat-form-field>

        <!-- TODO: Wizard steps -->
        @if (1 > 2) {
          <div formGroupName="wizard_step2">
            <input type="text" formControlName="tajne" value="tajne" />
          </div>
        }

        <div class="flex justify-end gap-md">
          <button (click)="submit()">Save</button>
          <button mat-flat-button (click)="onCancel()">Cancel</button>
        </div>
      </div>

      <pre>{{ form.value | json }}</pre>
    </form>
  `,
})
export class DealEditor {
  deal = input<Deal>(emptyDealDraft());

  private readonly censorValidator: ValidatorFn = (control) => {
    return control.value.includes('batman') ? { censor: 'bad word' } : null;
  };
 

  form = new FormGroup({
    title: new FormControl('', [Validators.required, this.censorValidator]),
    wizard_step2: new FormGroup({
      value: new FormControl(0),
    }),
  });

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  submit() {
    const form = this.form;

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
