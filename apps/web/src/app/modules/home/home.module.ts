import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostComponent } from './components/post/post.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopicComponent } from './components/topic/topic.component';

@NgModule({
  declarations: [HomeComponent, PostComponent, TopicComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
