import { FindUserByToken } from '@server/domain/use-cases';
import { noContent, ok, unauthorized } from '@server/presentation/helpers';
import { HttpResponse, Middleware } from '@server/presentation/protocols';

export class OptionalAuthMiddleware implements Middleware {
  constructor(private readonly findUserByToken: FindUserByToken) {}

  async handle(request: OptionalAuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const user = await this.findUserByToken.findUserByToken(accessToken);
        if (user) {
          return ok({ userId: user.id });
        }
      }
      return noContent();
    } catch (error) {
      return unauthorized();
    }
  }
}

export namespace OptionalAuthMiddleware {
  export interface Request {
    accessToken?: string;
  }
}
