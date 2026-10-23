import {
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Deal, DealStage } from '@feature/deals/model/deal';
import { DEAL_STAGES, DealStageLabel } from '@feature/deals/model/deal-stage-config';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { SharedForms, SharedUI } from '@shared/ui';

@Component({
  imports: [SharedForms, SharedUI, InfoGrid],
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

        <app-info-grid>
          @if (form.get('title'); as field) {
            <mat-form-field class="sm:col-span-3">
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
            <mat-label>Stage</mat-label>

            <mat-select formControlName="stage">
              @for (stage of stages; track stage) {
                <mat-option [value]="stage">{{ stageLabels[stage] }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Value</mat-label>

            <input type="number" min="0" matInput formControlName="value" />

            <mat-error>
              @if (form.get('value')?.getError('required')) {
                Field is required
              }
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Contact name</mat-label>

            <input type="text" matInput formControlName="contactName" />
          </mat-form-field>

          <mat-form-field class="sm:col-span-3">
            <mat-label>Description</mat-label>

            <textarea matInput rows="4" formControlName="description"></textarea>
          </mat-form-field>

          <mat-checkbox formControlName="public">Public</mat-checkbox>
        </app-info-grid>

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

  protected readonly stages = DEAL_STAGES;
  protected readonly stageLabels = DealStageLabel;

  bob = inject(NonNullableFormBuilder);

  form = this.bob.group({
    title: this.bob.control('', { validators: [Validators.required, this.censorValidator] }),
    value: [0],
    description: [''],
    stage: this.bob.control<DealStage>('new'),
    contactName: [''],
    public: [false],
    // wizard_step2: this.bob.group({
    //   value: [''], // control
    // }),
  });

  save = output<Deal>();
  cancel = output();

  constructor() {
    effect(() => this.form.reset(this.deal()));
  }

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
