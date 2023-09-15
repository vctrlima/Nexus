import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
];
