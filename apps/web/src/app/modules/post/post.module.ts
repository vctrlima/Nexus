import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TopicModule } from '@web/app/shared/topic/topic.module';
import { CreatePostToolbarComponent } from './components/create-post-toolbar/create-post-toolbar.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './pages/create-post/post.component';
import { ViewPostComponent } from './pages/view-post/view.component';
import { PostRoutingModule } from './post-routing.module';


@NgModule({
  declarations: [CreatePostToolbarComponent, CreatePostComponent, PostComponent, ViewPostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    CKEditorModule,
    TopicModule,
    ReactiveFormsModule
  ],
})
export class PostModule { }
