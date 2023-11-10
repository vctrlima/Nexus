import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@web/app/core/guards';
import { CreateComponent } from './views/create/create.component';
import { ViewComponent } from './views/view/view.component';

const routes: Routes = [
  { path: '', canActivate: [authGuard], component: CreateComponent },
  { path: ':id', component: ViewComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
