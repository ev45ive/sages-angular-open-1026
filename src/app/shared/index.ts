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
import { Avatar } from './ui/avatar/avatar';
import { UiCard } from './ui/card/card';
import { UiCardHeader } from './ui/card/card-header';
import { UiCardActions } from './ui/card/card-actions';
import { UiCardBadge } from './ui/card/card-badge';
import { JsonPipe } from '@angular/common';
import { FormField } from '@angular/forms/signals';

export { InfoGrid } from './ui/info-grid/info-grid';
export { InfoItem } from './ui/info-grid/info-item';
export { Avatar } from './ui/avatar/avatar';
export { UiCard } from './ui/card/card';
export { UiCardHeader } from './ui/card/card-header';
export { UiCardActions } from './ui/card/card-actions';
export { UiCardBadge } from './ui/card/card-badge';

/**
 * Components and module for Forms
 */
export const SharedForms = [
  FormField,
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

export const SharedUI = [
  InfoGrid,
  InfoItem,
  Avatar,
  UiCard,
  UiCardHeader,
  UiCardActions,
  UiCardBadge,
  MatButtonModule,
  JsonPipe,
];

export const SharedAll = [SharedUI, SharedForms];

@NgModule({
  declarations: [/* NonStandalone + export  */],
  imports: [SharedForms, [[[[SharedUI]]]]], // flat()
  exports: [SharedForms, SharedUI],
})
export class SharedModule {}
