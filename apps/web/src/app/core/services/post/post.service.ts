import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@web/environments/environment';
import { Post } from '../../interfaces/post.interface';
import { Like } from '../../interfaces/like.interface';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  public getPosts(
    search: {
      keywords?: string;
      topics?: string;
      skip: number;
      take: number;
    } = { skip: 0, take: 10 }
  ) {
    let params: any = { skip: search.skip, take: search.take };
    if (search.keywords) params = { ...params, keywords: search.keywords };
    if (search.topics) params = { ...params, topics: search.topics };
    return this._httpClient.get<Post[]>(`${this.apiUrl}/post`, { params });
  }

  public getPostById(id: string) {
    return this._httpClient.get<Post>(`${this.apiUrl}/post/${id}`);
  }

  public like(post: { id: string }) {
    return this._httpClient.post<Like>(`${this.apiUrl}/like`, { post });
  }

  public unlike(likeId: string) {
    return this._httpClient.delete(`${this.apiUrl}/like/${likeId}`);
  }

  public createPost(post : Post){
    return this._httpClient.post<Post>(`${this.apiUrl}/post`, post)
  }

  public deletePost(postId: string){
    return this._httpClient.delete(`${this.apiUrl}/post/${postId}`)
  }

  public editPost(postId:string, post: Post){
    return this._httpClient.put<Post>(`${this.apiUrl}/post/${postId}`, post)
  }
}

