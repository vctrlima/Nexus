import { CreatePost, FindPostById } from '@/domain/use-cases'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

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
