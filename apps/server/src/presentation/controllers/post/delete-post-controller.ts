import { DeletePost, FindPostById } from '@server/domain/use-cases';
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

export class DeletePostController implements Controller {
  constructor(
    private readonly deletePost: DeletePost,
    private readonly findPostById: FindPostById
  ) {}

  async handle(
    request: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params;
      const post = await this.findPostById.findById({ id });
      if (post.author.id !== request.user.id) return unauthorized();
      await this.deletePost.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
