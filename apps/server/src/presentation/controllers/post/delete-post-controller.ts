import { DeletePost } from '@server/domain/use-cases';
import { noContent, serverError } from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';

export class DeletePostController implements Controller {
  constructor(private readonly deletePost: DeletePost) {}

  // TODO: allow the deletion of posts only by the respective user
  async handle(
    request: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params;
      await this.deletePost.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
