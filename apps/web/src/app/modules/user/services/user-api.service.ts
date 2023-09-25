import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@web/environments/environment';

@Injectable()
export class UserApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public login(params: { email: string; password: string }) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, params);
  }

  public register(params: { email: string; password: string; name: string }) {
    return this.httpClient.post<RegisterResponse>(
      `${this.apiUrl}/user`,
      params
    );
  }
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string };
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
