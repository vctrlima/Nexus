import { FindUserByToken } from '@server/domain/use-cases';
import { AccessDeniedError } from '@server/presentation/errors';
import { forbidden, ok, unauthorized } from '@server/presentation/helpers';
import { HttpResponse, Middleware } from '@server/presentation/protocols';

export class AuthMiddleware implements Middleware {
  constructor(private readonly findUserByToken: FindUserByToken) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const user = await this.findUserByToken.findUserByToken(accessToken);
        if (user) {
          return ok({ userId: user.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return unauthorized();
    }
  }
}

export namespace AuthMiddleware {
  export interface Request {
    accessToken?: string;
  }
}
