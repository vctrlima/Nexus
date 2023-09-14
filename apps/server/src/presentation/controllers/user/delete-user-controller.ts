import { DeleteUser } from '@server/domain/use-cases'
import { noContent, serverError } from '@server/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@server/presentation/protocols'

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUser) {}

  // TODO: only the user with the same id can delete his account
  async handle(
    request: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<void>> {
    try {
      const { id } = request.params
      await this.deleteUser.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
