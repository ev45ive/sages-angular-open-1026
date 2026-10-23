import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { InfoItem } from './ui/info-grid/info-item';
import { InfoGrid } from './ui/info-grid/info-grid';

/**
 * Components and module for Forms
 */
export const SharedForms = [
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatBadgeModule,
  MatButtonModule,
];

export const SharedUI = [InfoGrid, InfoItem, MatButtonModule];

export const SharedAll = [SharedUI, SharedForms];

@NgModule({
  declarations: [/* NonStandalone + export  */],
  imports: [SharedForms, [[[[SharedUI]]]]], // flat()
  exports: [SharedForms, SharedUI],
})
export class SharedModule {}
