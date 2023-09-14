import { User } from '@server/domain/entities'
import { FindUserById } from '@server/domain/use-cases'
import { ok, serverError } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class FindUserByIdController implements Controller {
  constructor(private readonly findUserById: FindUserById) {}

  async handle(
    request: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<User>> {
    try {
      const { id } = request.params
      const user = await this.findUserById.find(id)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
