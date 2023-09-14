import { Post } from '@server/domain/entities'
import { FindPostById } from '@server/domain/use-cases'
import { ok, serverError } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class FindPostByIdController implements Controller {
  constructor(private readonly findPostById: FindPostById) {}

  async handle(
    request: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<Post>> {
    try {
      const { id } = request.params
      const post = await this.findPostById.find(id)
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
