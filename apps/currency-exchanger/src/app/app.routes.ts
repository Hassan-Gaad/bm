import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'details',
    loadComponent: () =>
      import('./details/details.component').then((m) => m.DetailsComponent),
  },
];
