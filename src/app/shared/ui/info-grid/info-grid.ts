import { Component } from '@angular/core';

@Component({
  selector: 'app-info-grid',
  host: { class: 'mt-5 grid grid-cols-3 gap-4' },
  template: `<ng-content />`,
})
export class InfoGrid {}
