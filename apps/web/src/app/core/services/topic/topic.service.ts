import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@web/environments/environment';
import { Topic } from '../../interfaces/topic.interface';

@Injectable({ providedIn: 'root' })
export class TopicService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public getTopics() {
    return this.httpClient.get<Topic[]>(`${this.apiUrl}/topic`);
  }
}
