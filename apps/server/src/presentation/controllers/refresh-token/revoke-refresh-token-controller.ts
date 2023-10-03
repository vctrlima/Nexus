import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases';
import {
  noContent,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';

export class RevokeRefreshTokenController implements Controller {
  constructor(
    private readonly revokeRefreshTokenByUserId: RevokeRefreshTokenByUserId
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.user.id) return unauthorized();
      const { id: userId } = request.user;
      await this.revokeRefreshTokenByUserId.revokeByUserId(userId);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
