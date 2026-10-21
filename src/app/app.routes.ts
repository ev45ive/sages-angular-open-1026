import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'deals',
    loadChildren: () => import('./features/deals').then((m) => m.dealsRoutes),
  },
];
