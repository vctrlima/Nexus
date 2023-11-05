import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public searchParams!: SearchPostsParams;
  public topics: Topic[] = [];

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
    private readonly topicService: TopicService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.scrollToTop();
    this.subscribeSearch();
    this.subscribeQueryParams();
    this.getTopics();
  }

  private defineQueryParams(queryParams: SearchPostsParams) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private subscribeQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const skip = params['skip'];
      const take = params['take'];
      let queryParams: any = { skip: skip ?? 0, take: take ?? 15 };
      const keywords = params['keywords'];
      if (keywords) queryParams = { ...queryParams, keywords };
      const topics = params['topics'];
      if (topics) queryParams = { ...queryParams, topics };
      if (!this.searchParams != queryParams) {
        this.searchParams = queryParams;
        this.getPosts();
      }
    });
  }

  private scrollToTop() {
    window.scroll(0, 0);
  }

  private subscribeSearch(): void {
    this.searchService.searchQuery.subscribe((keywords) => {
      this.clearPosts();
      if (keywords) {
        this.defineQueryParams({ ...this.searchParams, skip: 0, keywords });
      }
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

  private getTopicSearchParams(): SearchPostsParams {
    const skip = 0;
    const { take, keywords } = this.searchParams;
    const topics = this.topics
      .filter((x) => x.selected)
      .map((x) => x.id)
      .join(',');
    return { skip, take, keywords, topics };
  }

  private toggleTopic(topic: Topic, selected: boolean): void {
    topic.selected = selected;
  }

  public handleTopicSelection(topic: Topic, selected: boolean): void {
    this.toggleTopic(topic, selected);
    this.clearPosts();
    const queryParams = this.getTopicSearchParams();
    this.defineQueryParams(queryParams);
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
    const searchTakePagination = parseInt(this.searchParams.take.toString());
    if (currentPostsLength % searchTakePagination !== 0) return;
    this.defineQueryParams({
      ...this.searchParams,
      skip: parseInt(this.searchParams.skip.toString()) + searchTakePagination,
    });
  }
}

interface SearchPostsParams {
  keywords?: string;
  topics?: string;
  skip: number;
  take: number;
}
