import { Route } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./modules/post/post.module').then((m) => m.PostModule),
      },
      {
        path: '**',
        redirectTo: '/',
      },
    ],
  },
];
