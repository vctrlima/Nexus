import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  Post,
  PostService,
  Topic,
  TopicService,
} from '@web/app/core/services';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'nexus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [];
  public topics$!: Observable<Topic[]>;

  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly topicService: TopicService
  ) {}

  public ngOnInit(): void {
    this.getTopics();
    this.getPosts();
  }

  private getTopics(): void {
    this.topics$ = this.topicService.getTopics();
  }

  private getPosts(skip = 0): void {
    this.postService.getPosts({ skip, take: 20 }).subscribe({
      next: (response) => {
        this.posts = [...this.posts, ...response];
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  public togglePostLike(post: Post): void {
    if (post.like?.id) {
      this.unlikePost(post);
    } else {
      this.likePost(post);
    }
  }

  private likePost(post: Post): void {
    this.postService.like(post).subscribe({
      next: (like) => {
        post.like = like;
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  private unlikePost(post: Post): void {
    if (!post.like) return;
    this.postService.unlike(post.like.id).subscribe({
      next: () => {
        post.like = undefined;
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }
}
