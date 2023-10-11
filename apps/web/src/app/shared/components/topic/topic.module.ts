import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopicComponent } from './topic.component';

@NgModule({
  declarations: [TopicComponent],
  imports: [CommonModule],
  exports: [TopicComponent],
})
export class TopicModule {}
