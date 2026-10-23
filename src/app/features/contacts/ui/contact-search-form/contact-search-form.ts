import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule],
  selector: 'app-contact-search-form',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div role="search" class="grid gap-3">
      <div class="flex items-center gap-3">
        <mat-form-field class="grow" subscriptSizing="dynamic">
          <mat-icon matPrefix>search</mat-icon>
          <mat-label>Search contacts by name, email or company...</mat-label>
          <input matInput type="search" />
        </mat-form-field>

        <button type="button" mat-flat-button>Search</button>
      </div>

      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title>Advanced Search</mat-panel-title>
        </mat-expansion-panel-header>

        <p class="text-body-md text-on-surface-variant">Advanced filters will appear here.</p>
      </mat-expansion-panel>
    </div>
  `,
})
export class ContactSearchForm {}
