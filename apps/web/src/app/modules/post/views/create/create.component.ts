import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  AuthService,
  PostService,
  Topic,
  TopicService,
  User,
} from '@web/app/core/services';
import { throwError } from 'rxjs';

@Component({
  selector: 'nexus-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public readonly editor = ClassicEditor;
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

  public topics!: Topic[];

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly topicService: TopicService,
    private readonly router: Router
  ) {}

  public ngOnInit() {
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
    this.postService.create(this.post.value as any).subscribe({
      next: (response) => {
        this.router.navigate([`/post/${response.id}`]);
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }
}
