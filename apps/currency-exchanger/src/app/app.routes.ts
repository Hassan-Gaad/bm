import { Route } from '@angular/router';
import { detailsResolver } from './details/details.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'details',
    resolve:{data:detailsResolver},
    loadComponent: () =>
      import('./details/details.component').then((m) => m.DetailsComponent),
  },
];
