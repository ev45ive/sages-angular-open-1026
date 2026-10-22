import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-item',
  template: `
    <div class="text-label-lg text-on-surface">
      <ng-content select="[info-label]">{{ label() }}</ng-content>
    </div>
    <div class="mt-1 text-body-lg text-on-surface">
      <ng-content>{{ value() }}</ng-content>
    </div>
  `,
})
export class InfoItem {
  label = input<string | null>();
  value = input<string | null>();
}
