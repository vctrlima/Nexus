import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases'
import { MissingParamError } from '@server/presentation/errors'
import { badRequest, noContent, serverError } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class RevokeRefreshTokenController implements Controller {
  constructor(
    private readonly revokeRefreshTokenByUserId: RevokeRefreshTokenByUserId,
  ) {}

  async handle(
    request: HttpRequest<{ userId: string }>,
  ): Promise<HttpResponse> {
    try {
      if (!request.body) return badRequest(new MissingParamError('body'))
      const { userId } = request.body
      if (!userId) return badRequest(new MissingParamError('userId'))
      await this.revokeRefreshTokenByUserId.revokeByUserId(userId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
