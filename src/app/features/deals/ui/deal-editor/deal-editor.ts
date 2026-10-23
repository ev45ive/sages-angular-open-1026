import { Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Deal, DealStage } from '@feature/deals/model/deal';
import { DEAL_STAGES, DealStageLabel } from '@feature/deals/model/deal-stage-config';
import { Task, TaskPriority } from '@feature/deals/model/task';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { SharedForms, SharedUI } from '@shared/ui';

function createTaskGroup(fb: NonNullableFormBuilder, task: Partial<Task> = {}) {
  return fb.group({
    id: [task.id ?? ''],
    title: [task.title ?? '', Validators.required],
    priority: fb.control<TaskPriority>(task.priority ?? 'medium'),
    completed: [task.completed ?? false],
  });
}

type TaskFormGroup = ReturnType<typeof createTaskGroup>;

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
            <mat-form-field class="sm:col-span-full">
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

          <mat-form-field class="sm:col-span-full">
            <mat-label>Description</mat-label>

            <textarea matInput rows="4" formControlName="description"></textarea>
          </mat-form-field>

          <mat-checkbox formControlName="public">Public</mat-checkbox>
        </app-info-grid>

        <section class="grid gap-sm" formArrayName="tasks">
          <div class="flex items-center justify-between">
            <h3 class="text-title-sm">Tasks</h3>
            <button type="button" mat-stroked-button aria-label="Add task" (click)="addTask()">+</button>
          </div>

          @for (task of tasks.controls; track task; let i = $index) {
            <div class="grid items-center gap-md sm:grid-cols-[2fr_1fr_auto_auto]" [formGroupName]="i">
              <mat-form-field>
                <mat-label>Task title</mat-label>

                <input type="text" matInput formControlName="title" />

                <mat-error>
                  @if (task.get('title')?.getError('required')) {
                    Field is required
                  }
                </mat-error>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Priority</mat-label>

                <mat-select formControlName="priority">
                  @for (priority of priorities; track priority) {
                    <mat-option [value]="priority">{{ priority }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-checkbox formControlName="completed">Completed</mat-checkbox>

              <button type="button" mat-icon-button aria-label="Remove task" (click)="removeTask(i)">-</button>
            </div>
          }
        </section>

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
  private readonly censorValidator: ValidatorFn = (control) => {
    return control.value.includes('batman') ? { censor: 'bad word' } : null;
  };

  protected readonly stages = DEAL_STAGES;
  protected readonly stageLabels = DealStageLabel;
  protected readonly priorities: readonly TaskPriority[] = ['low', 'medium', 'high'];

  bob = inject(NonNullableFormBuilder);

  deal = input<Deal>(emptyDealDraft());

  resetFormEffect = effect(() => {
    const deal = this.deal();

    this.tasks.clear();
    deal.tasks?.forEach((task) => this.tasks.push(createTaskGroup(this.bob, task)));
    this.form.reset(deal);
  });

  form = this.bob.group({
    title: this.bob.control('', { validators: [Validators.required, this.censorValidator] }),
    value: [0],
    description: [''],
    stage: this.bob.control<DealStage>('new'),
    contactName: [''],
    public: [false],
    tasks: this.bob.array<TaskFormGroup>([]),
    // wizard_step2: this.bob.group({
    //   value: [''], // control
    // }),
  });

  protected readonly tasks = this.form.controls.tasks;

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  addTask() {
    this.tasks.push(createTaskGroup(this.bob));
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  submit() {
    const form = this.form;

    const draft: Deal = {
      ...this.deal(),
      ...form.getRawValue(),
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
