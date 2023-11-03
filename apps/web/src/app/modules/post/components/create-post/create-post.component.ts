import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Topic } from '@web/app/core/interfaces/topic.interface';
import { User } from '@web/app/core/interfaces/user.interface';
import { AuthService } from '@web/app/core/services/auth/auth.service';
import { PostService } from '@web/app/core/services/post/post.service';
import { TopicService } from '@web/app/core/services/topic/topic.service';
import { throwError } from 'rxjs';
import { Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'nexus-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {

  public readonly editor = ClassicEditor;
  public topics!: Topic[];
  public addScaleOutClass = false;
  public readonly config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'blockQuote',
      '|',
      'bulletedList',
      'numberedList',
    ],
    shouldNotGroupWhenFull: false,
  };
  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly topicService: TopicService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    this.topicService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  public post = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(80),
    ]),
    author: new FormControl<User>(this.authService.user as User, [
      Validators.required,
    ]),
    published: new FormControl(true, [Validators.required]),
    topics: new FormControl<Topic[]>([], [Validators.required]),
  });

  public submit() {
    this.post.get('topics')?.setValue(this.topics.filter((x) => x.selected));
    if (this.post.invalid) return;
    this.postService.createPost(this.post.value as any).subscribe({
      next: (response) => {
        this.addScaleOutClass = true;
        setTimeout(() => {
          this.router.navigate([`/post/${response.id}`]);
        }, 1000)
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }
}


