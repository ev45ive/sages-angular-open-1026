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
    <app-shell [title]="appName()"> <!-- dynamic [binding] -->
      <!-- Content -> <ng-content> -->
      <router-outlet />
    </app-shell>


    <!-- HTML: -->
    <!-- <button type="submit" onclick=""> content html </button> -->
  `,
})
export class App {
  /* Context */
  
  // + Zone.js - click => dirty checking change detection
  // title = 'Sages' 

  protected readonly appName = signal('sages');
}
