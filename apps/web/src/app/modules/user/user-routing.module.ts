import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notLoggedInGuard } from '@web/app/core/guards';
import { LoginComponent, RegisterComponent } from './views';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [notLoggedInGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [notLoggedInGuard],
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
