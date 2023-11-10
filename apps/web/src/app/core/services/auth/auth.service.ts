import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@web/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public get user(): User | false {
    const user = localStorage.getItem('user');
    if (!user) return false;
    return JSON.parse(user) as User;
  }

  public get accessToken(): string | false {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    return accessToken;
  }

  public get refreshToken(): string | false {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;
    return refreshToken;
  }

  public get isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  public setSession(loginResponse: LoginResponse): void {
    this.setUser(loginResponse.user);
    this.setAccessToken(loginResponse.accessToken);
    this.setRefreshToken(loginResponse.refreshToken);
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  public setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public login(params: { email: string; password: string }) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, params);
  }

  public register(params: { email: string; password: string; name: string }) {
    return this.httpClient.post<RegisterResponse>(
      `${this.apiUrl}/user`,
      params
    );
  }

  public refreshSession(refreshToken: string) {
    return this.httpClient.post<RefreshTokenResponse>(
      `${this.apiUrl}/refresh-token`,
      { refreshToken }
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
