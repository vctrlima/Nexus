import { Injectable } from '@angular/core';
import { LoginResponse } from '@web/app/modules/user/services';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public get user(): User | false {
    const user = localStorage.getItem('user');
    if (!user) return false;
    return JSON.parse(user);
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
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
    localStorage.setItem('accessToken', loginResponse.accessToken);
    localStorage.setItem('refreshToken', loginResponse.refreshToken);
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
