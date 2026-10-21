import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/deals',
    pathMatch: 'full',
  },
  {
    path: 'deals',
    // children:[
    //       {path: 'search',component: DealsSearchPage,},
    //       {path: 'deatails',component: DealsDeatailsPage,},
    // ],
    // loadChildren: () => import('./features/deals/deals.routes'),
    loadChildren: () => import('./features/deals').then((e) => e.dealsRoutes),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/layouts/page-not-found/page-not-found').then((e) => e.PageNotFound),
  },
];
