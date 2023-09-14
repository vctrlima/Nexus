import { CreatePost, FindPostById } from '@server/domain/use-cases'
import { MissingParamError } from '@server/presentation/errors'
import { badRequest, created, serverError } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class CreatePostController implements Controller {
  constructor(
    private readonly createPost: CreatePost,
    private readonly findPostById: FindPostById,
  ) {}

  async handle(
    request: HttpRequest<CreatePost.Params>,
  ): Promise<HttpResponse<FindPostById.Model>> {
    try {
      const { body } = request
      if (!body) return badRequest(new MissingParamError('body'))
      const { id } = await this.createPost.create(body)
      const post = await this.findPostById.find(id)
      return created(post)
    } catch (error) {
      return serverError(error)
    }
  }
}
