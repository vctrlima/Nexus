import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  Post,
  PostService,
  SearchService,
  Topic,
  TopicService,
} from '@web/app/core/services';
import { throwError } from 'rxjs';

@Component({
  selector: 'nexus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public posts: Post[] = [];
  public searchParams: SearchPostsParams = { skip: 0, take: 20 };
  public topics: Topic[] = [];
  private loaded = false;

  public get selectedTopics() {
    return this.topics
      .filter((x) => x.selected)
      .map((x) => `#${x.label}`)
      .join(', ');
  }

  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly searchService: SearchService,
    private readonly topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.subscribeSearch();
    this.getTopics();
    this.getPosts();
  }

  private subscribeSearch(): void {
    this.searchService.searchQuery.subscribe((keywords) => {
      this.searchParams = { ...this.searchParams, keywords };
      if (this.loaded) this.getPosts();
      else this.loaded = true;
    });
  }

  private getTopics(): void {
    this.topicService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  private getPosts(): void {
    this.postService.getPosts(this.searchParams).subscribe({
      next: (response) => {
        this.posts = [...this.posts, ...response];
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  private clearPosts(): void {
    this.posts = [];
  }

  private setTopicSearchParams(): void {
    this.searchParams.topics = this.topics
      .filter((x) => x.selected)
      .map((x) => x.id)
      .join(',');
  }

  private toggleTopic(topic: Topic, selected: boolean): void {
    topic.selected = selected;
  }

  public handleTopicSelection(topic: Topic, selected: boolean): void {
    this.toggleTopic(topic, selected);
    this.setTopicSearchParams();
    this.clearPosts();
    this.getPosts();
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

interface SearchPostsParams {
  keywords?: string;
  topics?: string;
  skip: number;
  take: number;
}
