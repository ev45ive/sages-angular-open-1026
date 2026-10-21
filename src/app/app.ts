import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AppShell } from './core/layouts/app-shell/app-shell';

@Component({
  /* Host: */
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, AppShell],
  styles: [``],
  template: `
    <!-- View -> template -->
    <app-shell>
      <!-- Content -> <ng-content> -->
      <router-outlet />
    </app-shell>
  `,
})
export class App {
  /* Context */
  protected readonly title = signal('sages');
}
