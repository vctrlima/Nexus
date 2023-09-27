import { DeleteUser } from '@server/domain/use-cases';
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

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUser) {}

  async handle(
    request: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params;
      if (id !== request.user.id) return unauthorized();
      await this.deleteUser.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
