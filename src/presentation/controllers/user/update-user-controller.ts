import { UpdateUser } from '@/domain/use-cases'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidation, PasswordValidation } from '@/validation/validators'

export class UpdateUserController implements Controller {
  constructor(
    private readonly updateUser: UpdateUser,
    private readonly emailValidation: EmailValidation,
    private readonly passwordValidation: PasswordValidation,
  ) {}

  async handle(
    request: HttpRequest<UpdateUser.Params>,
  ): Promise<HttpResponse<UpdateUser.Model>> {
    try {
      const { body } = request
      const { id } = request.params
      body.id = id
      const invalidEmail = this.emailValidation.validate(body.email)
      if (invalidEmail) return badRequest(invalidEmail)
      const invalidPassword = this.passwordValidation.validate(body.password)
      if (invalidPassword) return badRequest(invalidPassword)
      const user = await this.updateUser.update(body)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
