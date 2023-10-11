import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisibleDirectiveModule } from '@web/app/core/directives';
import { PostComponent } from './components/post/post.component';
import { TopicComponent } from './components/topic/topic.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, PostComponent, TopicComponent],
  imports: [CommonModule, HomeRoutingModule, VisibleDirectiveModule],
})
export class HomeModule {}
