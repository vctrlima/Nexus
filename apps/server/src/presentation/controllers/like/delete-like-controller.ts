import { DeleteLike, FindLikeById } from '@server/domain/use-cases';
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

export class DeleteLikeController implements Controller {
  constructor(
    private readonly deleteLike: DeleteLike,
    private readonly findLikeById: FindLikeById
  ) {}

  async handle(
    request: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params;
      const like = await this.findLikeById.findById(id);
      if (like.user.id !== request.user.id) return unauthorized();
      await this.deleteLike.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
