import { User } from '@/domain/entities'
import { FindUserById } from '@/domain/use-cases'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class FindUserByIdController implements Controller {
  constructor(private readonly findUserById: FindUserById) {}

  async handle(
    request: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<User>> {
    try {
      const { id } = request.params
      const post = await this.findUserById.find(id)
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
