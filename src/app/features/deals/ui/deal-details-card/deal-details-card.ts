import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-deal-details-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <article class="rounded-xl bg-white p-5 shadow-md">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-slate-700">Enterprise License — Tech Solutions</h2>
          <p class="mt-1 text-sm text-slate-600">Annual enterprise license for 50 seats. Awaiting legal review.</p>
        </div>
        <div class="flex shrink-0 items-center gap-3">
          <span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-red-700">negotiation</span>
          <button
            type="button"
            class="rounded-md border border-teal-500 bg-white px-4 py-1.5 text-sm text-teal-700 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Edit
          </button>
        </div>
      </div>
      <dl class="mt-5 grid grid-cols-3 gap-4">
        <div>
          <dt class="text-sm font-semibold text-slate-700">Value</dt>
          <dd class="mt-1 text-lg text-slate-700">$48,000</dd>
        </div>
        <div>
          <dt class="text-sm font-semibold text-slate-700">Contact</dt>
          <dd class="mt-1 text-base text-slate-600">Anna Kowalska</dd>
        </div>
        <div>
          <dt class="text-sm font-semibold text-slate-700">Public</dt>
          <dd class="mt-1 text-base text-slate-600">Yes</dd>
        </div>
      </dl>
    </article>
  `,
})
export class DealDetailsCard {}
