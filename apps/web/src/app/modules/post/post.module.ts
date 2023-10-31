import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreatePostToolbarComponent } from './components/create-post-toolbar/create-post-toolbar.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TopicModule } from '@web/app/shared/topic/topic.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreatePostToolbarComponent, CreatePostComponent, PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    CKEditorModule,
    TopicModule,
    ReactiveFormsModule
  ],
})
export class PostModule { }
