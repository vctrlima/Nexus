import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './pages/create-post/post.component';
import { ViewPostComponent } from './pages/view-post/view.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: ':id', component: ViewPostComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
