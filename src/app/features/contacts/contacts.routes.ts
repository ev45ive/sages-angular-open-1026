import { Routes } from '@angular/router';
import { ContactDetailsPage } from './pages/contact-details/contact-details.page';
import { ContactSearchPage } from './pages/contact-search/contact-search.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: ContactSearchPage,
  },
  {
    path: 'details/:id',
    component: ContactDetailsPage,
  },
];

export default routes;
