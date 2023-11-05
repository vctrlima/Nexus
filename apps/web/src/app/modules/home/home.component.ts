import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  Post,
  PostService,
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
  public searchParams: SearchPostsParams = {
    keywords: '',
    topics: '',
    skip: 0,
    take: 15,
  };
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
    private readonly topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.scrollToTop();
    this.getTopics();
    this.getPosts();
  }

  private scrollToTop() {
    window.scroll(0, 0);
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

  public getPosts(): void {
    this.postService.getPosts(this.searchParams).subscribe({
      next: (response) => {
        this.posts = this.posts.concat(response);
      },
      error: (error) => {
        return throwError(() => new Error(error));
      },
    });
  }

  public clearPosts(): void {
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
    this.searchParams = queryParams;
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
    const searchTakePagination = parseInt(this.searchParams.take.toString());
    if (currentPostsLength % searchTakePagination !== 0) return;
    this.searchParams = {
      ...this.searchParams,
      skip: parseInt(this.searchParams.skip.toString()) + searchTakePagination,
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
