import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@web/app/core/services';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly requestHeaderTokenKey: string = 'x-access-token';

  private refreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    let authReq = req;
    const token = this.authService.accessToken;
    if (token) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('login') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => new Error(error));
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshing) {
      this.refreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.authService.refreshToken;
      if (token)
        return this.authService.refreshSession(token).pipe(
          switchMap((token) => {
            this.refreshing = false;
            this.authService.setAccessToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((error) => {
            this.refreshing = false;
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => new Error(error));
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(this.requestHeaderTokenKey, token),
    });
  }
}
