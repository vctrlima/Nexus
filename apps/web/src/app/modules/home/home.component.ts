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
  public searchParams: SearchPostsParams = { skip: 0, take: 15 };
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
    this.scrollToTop();
    this.subscribeSearch();
    this.getTopics();
    this.getPosts();
  }

  private scrollToTop() {
    window.scroll(0, 0);
  }

  private subscribeSearch(): void {
    this.searchService.searchQuery.subscribe((keywords) => {
      if (this.loaded) {
        this.searchParams = {
          ...this.searchParams,
          skip: 0,
          take: 15,
          keywords,
        };
        this.clearPosts();
        this.getPosts();
      } else this.loaded = true;
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
        this.posts = this.posts.concat(response);
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

  public getMorePosts(visible = false) {
    if (!visible) return;
    const currentPostsLength = this.posts.length;
    if (currentPostsLength <= 0) return;
    const searchTakePagination = this.searchParams.take;
    if (currentPostsLength % searchTakePagination !== 0) return;
    this.searchParams = {
      ...this.searchParams,
      skip: this.searchParams.skip + searchTakePagination,
    };
    this.getPosts();
  }
}

interface SearchPostsParams {
  keywords?: string;
  topics?: string;
  skip: number;
  take: number;
}
