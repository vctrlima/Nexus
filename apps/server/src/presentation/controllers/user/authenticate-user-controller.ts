import { AuthenticateUser } from '@server/domain/use-cases'
import { MissingParamError } from '@server/presentation/errors'
import { badRequest, ok, unauthorized } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class AuthenticateUserController implements Controller {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  async handle(
    request: HttpRequest<AuthenticateUser.Params>,
  ): Promise<HttpResponse<AuthenticateUser.Model>> {
    try {
      const { body } = request
      if (!body) return badRequest(new MissingParamError('body'))
      if (!body.email) return badRequest(new MissingParamError('email'))
      if (!body.password) return badRequest(new MissingParamError('password'))
      const auth = await this.authenticateUser.auth({
        email: body.email,
        password: body.password,
      })
      return ok(auth)
    } catch (error) {
      return unauthorized()
    }
  }
}
