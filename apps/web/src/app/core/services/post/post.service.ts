import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic, User } from '@web/app/core/services';
import { environment } from '@web/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getPosts(
    params: {
      keywords?: string;
      topics?: string;
      skip: number;
      take: number;
    } = { skip: 0, take: 10 }
  ) {
    return this.httpClient.get<Post[]>(`${this.apiUrl}/post`, { params });
  }

  public like(post: { id: string }) {
    return this.httpClient.post<Like>(`${this.apiUrl}/like`, { post });
  }

  public unlike(likeId: string) {
    return this.httpClient.delete(`${this.apiUrl}/like/${likeId}`);
  }
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author?: User;
  topics?: Topic[];
  like?: Like;
  likes?: Like[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Like {
  id: string;
  user: User;
  post: Post;
  createdAt?: Date;
}
