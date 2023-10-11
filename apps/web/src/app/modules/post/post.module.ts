import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopicModule } from '@web/app/shared/components';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './views/post/post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, PostRoutingModule, TopicModule],
})
export class PostModule {}
