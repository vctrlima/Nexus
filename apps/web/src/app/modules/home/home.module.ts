import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisibleDirectiveModule } from '@web/app/core/directives';
import { TopicModule } from '@web/app/shared/components';
import { PostComponent } from './components/post/post.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, PostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TopicModule,
    VisibleDirectiveModule,
  ],
})
export class HomeModule {}
