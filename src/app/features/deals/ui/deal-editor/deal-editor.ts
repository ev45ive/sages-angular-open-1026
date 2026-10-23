import { JsonPipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  NonNullableFormBuilder,
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
        <!-- @let titleField = form.get('title'); -->

        @if (form.get('title'); as field) {
          <mat-form-field>
            <mat-label>Title</mat-label>

            <input type="text" matInput formControlName="title" />

            <mat-hint align="end"> {{ field?.value?.length }} / 100 </mat-hint>
            <mat-error>
              @if (field?.getError('required')) {
                Field is required
              }
              @if (field?.getError('censor'); as error) {
                Cannot contain bad word "{{ error.censor }}"
              }
            </mat-error>
          </mat-form-field>
        }

        <mat-form-field>
          <mat-label>Value</mat-label>

          <input type="number" min="0" matInput formControlName="value" />

          <mat-error>
            @if (form.get('value')?.getError('required')) {
              Field is required
            }
          </mat-error>
        </mat-form-field>

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

  bob = inject(NonNullableFormBuilder);

  form = this.bob.group({
    title: this.bob.control('', { validators: [Validators.required, this.censorValidator] }),
    value: [0],
    // wizard_step2: this.bob.group({
    //   value: [''], // control
    // }),
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
