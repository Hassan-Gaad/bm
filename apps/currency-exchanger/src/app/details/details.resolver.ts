import { ResolveFn } from '@angular/router';

export const detailsResolver: ResolveFn<boolean> = (route, state) => {
  console.log(route);
  console.log(state);
  return true;
};
