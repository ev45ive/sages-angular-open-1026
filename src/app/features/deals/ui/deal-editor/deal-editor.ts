import { Component, inject, input, linkedSignal, output } from '@angular/core';
import { applyEach, form, FormField, required, submit, validate } from '@angular/forms/signals';
import { Deal, DealStage } from '@feature/deals/model/deal';
import { DEAL_STAGES, DealStageLabel } from '@feature/deals/model/deal-stage-config';
import { Task, TaskPriority } from '@feature/deals/model/task';
import { InfoGrid } from '@shared/ui/info-grid/info-grid';
import { SharedForms, SharedUI } from '@shared/ui';

interface DealFormModel extends Omit<Deal, 'id' | 'tasks'> {
  tasks: Task[];
}

function toFormModel(deal: Deal): DealFormModel {
  return {
    // title: deal.title,
    // description: deal.description,
    // stage: deal.stage,
    // value: deal.value,
    // contactName: deal.contactName,
    // public: deal.public,

    ...deal,
    tasks: (deal.tasks ?? []).map((task) => createTask(task)),
    // wizard_step2: this.bob.group({
    //   value: [''], // control
    // }),
  };
}

function createTask(task: Partial<Task> = {}): Task {
  return {
    id: task.id ?? '',
    title: task.title ?? '',
    priority: task.priority ?? 'medium',
    completed: task.completed ?? false,
  };
}

@Component({
  imports: [SharedForms, SharedUI, InfoGrid, FormField],
  selector: 'app-deal-editor',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <form>
      <div class="grid gap-5 p-5">
        <h2 class="text-xl">Edit Deal</h2>
        <!-- @let titleField = form.get('title'); -->

        <app-info-grid>
          <mat-form-field class="sm:col-span-full">
            <mat-label>Title</mat-label>

            <input type="text" matInput [formField]="form.title" />

            <mat-hint align="end"> {{ form.title().value().length }} / 100 </mat-hint>
            <mat-error>{{ form.title().errors()[0]?.message }}</mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Stage</mat-label>

            <mat-select [formField]="form.stage">
              @for (stage of stages; track stage) {
                <mat-option [value]="stage">{{ stageLabels[stage] }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Value</mat-label>

            <input type="number" matInput [formField]="form.value" />
          </mat-form-field>

          <!-- <mat-form-field>
            <mat-label>Contact name</mat-label>

            <input type="text" matInput [formField]="form.contactName" />
          </mat-form-field> -->

          <mat-form-field class="sm:col-span-full">
            <mat-label>Description</mat-label>

            <textarea matInput rows="4" [formField]="form.description"></textarea>
          </mat-form-field>

          <mat-checkbox [formField]="form.public">Public</mat-checkbox>
        </app-info-grid>

        <section class="grid gap-sm">
          <div class="flex items-center justify-between">
            <h3 class="text-title-sm">Tasks</h3>
            <button type="button" mat-stroked-button aria-label="Add task" (click)="addTask()">
              +
            </button>
          </div>

          @for (task of form.tasks; track $index; let i = $index) {
            <div class="grid items-center gap-md sm:grid-cols-[2fr_1fr_auto_auto]">
              <mat-form-field>
                <mat-label>Task title</mat-label>

                <input type="text" matInput [formField]="task.title" />

                <mat-error>{{ task.title().errors()[0]?.message }}</mat-error>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Priority</mat-label>

                <mat-select [formField]="task.priority">
                  @for (priority of priorities; track priority) {
                    <mat-option [value]="priority">{{ priority }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-checkbox [formField]="task.completed">Completed</mat-checkbox>

              <button
                type="button"
                mat-icon-button
                aria-label="Remove task"
                (click)="removeTask(i)"
              >
                -
              </button>
            </div>
          }
        </section>

        <div class="flex justify-end gap-md">
          <button (click)="onSubmit()">Save</button>
          <button mat-flat-button (click)="onCancel()">Cancel</button>
        </div>
      </div>

      <pre>{{ form().value() | json }}</pre>
    </form>
  `,
})
export class DealEditor {
  protected readonly stages = DEAL_STAGES;
  protected readonly stageLabels = DealStageLabel;
  protected readonly priorities: readonly TaskPriority[] = ['low', 'medium', 'high'];

  deal = input<Deal>();

  private readonly draftModel = linkedSignal<DealFormModel>(() =>
    toFormModel(this.deal() ?? emptyDealDraft()),
  );

  protected readonly form = form(this.draftModel, (path) => {
    // required(path.description)

    // Form Config
    required(path.title, { message: 'Field is required' });
    validate(path.title, ({ value }) =>
      value().includes('batman')
        ? { kind: 'censor', message: 'Cannot contain bad word "batman"' }
        : undefined,
    );

    // validateAsync(path.title, {
    //   params: ({ value }) => value(),
    //   factory: (params) =>
    //     resource({
    //       params,
    //       loader: ({ params: text, abortSignal }) => checkCensored(text, abortSignal),
    //     }),
    //   onSuccess: (isCensored) =>
    //     isCensored ? { kind: 'censor', message: 'Cannot contain bad word "batman"' } : undefined,
    //   onError: () => undefined,
    // });

    applyEach(path.tasks, (task) => {
      required(task.title, { message: 'Field is required' });
    });
  });

  save = output<Deal>();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  addTask() {
    this.form.tasks().value.update((tasks) => [...tasks, createTask()]);
  }

  removeTask(index: number) {
    this.form.tasks().value.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  async onSubmit() {
    await submit(this.form, async (form) => {
      // form()...

      this.save.emit({ ...this.deal()!, ...this.draftModel() });
    });
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
    // contactId: '',
    public: false,
  };
}
