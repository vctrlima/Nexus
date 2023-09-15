import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
];
