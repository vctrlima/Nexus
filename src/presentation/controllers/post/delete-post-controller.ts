import { DeletePost } from '@/domain/use-cases'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class DeletePostController implements Controller {
  constructor(private readonly deletePost: DeletePost) {}

  async handle(
    request: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params
      await this.deletePost.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
