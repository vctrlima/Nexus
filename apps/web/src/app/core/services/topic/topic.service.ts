import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@web/app/core/services';
import { environment } from '@web/environments/environment';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getTopics() {
    return this.httpClient.get<Topic[]>(`${this.apiUrl}/topic`);
  }
}

export interface Topic {
  id: string;
  label: string;
  posts?: Post[];
  selected?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
