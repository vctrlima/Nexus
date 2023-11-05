import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TopicModule } from '@web/app/shared/components';
import { PostRoutingModule } from './post-routing.module';
import { CreateComponent } from './views/create/create.component';
import { ViewComponent } from './views/view/view.component';

@NgModule({
  declarations: [ViewComponent, CreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    PostRoutingModule,
    TopicModule,
  ],
})
export class PostModule {}
