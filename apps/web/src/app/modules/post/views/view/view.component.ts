import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, Post, PostService } from '@web/app/core/services';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'nexus-post',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  public id!: string;
  public post$!: Observable<Post>;

  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadRouteId();
    this.loadResources();
  }

  private loadRouteId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.id = id;
  }

  private loadResources(): void {
    this.post$ = this.postService.getPostById(this.id);
  }

  public toggleLike(post: Post): void {
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
