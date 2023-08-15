import { UpdatePost } from '@/domain/use-cases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class UpdatePostController implements Controller {
  constructor(private readonly updatePost: UpdatePost) {}

  async handle(
    request: HttpRequest<UpdatePost.Params>,
  ): Promise<HttpResponse<any>> {
    try {
      const { body } = request
      const { id } = request.params
      body.id = id
      const post = await this.updatePost.update(body)
      return ok(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
