import { DeleteUser } from '@/domain/use-cases'
import { noContent, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUser) {}

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
