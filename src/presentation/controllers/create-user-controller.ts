import { CreateUser, FindUserById } from '@/domain/use-cases'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { EmailValidation, PasswordValidation } from '@/validation/validators'

export class CreateUserController implements Controller {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findUserById: FindUserById,
    private readonly emailValidation: EmailValidation,
    private readonly passwordValidation: PasswordValidation,
  ) {}

  async handle(
    request: HttpRequest<CreateUser.Params>,
  ): Promise<HttpResponse<FindUserById.Model>> {
    try {
      const { body } = request
      const invalidEmail = this.emailValidation.validate(body.email)
      if (invalidEmail) return badRequest(invalidEmail)
      const invalidPassword = this.passwordValidation.validate(body.password)
      if (invalidPassword) return badRequest(invalidPassword)
      const { id } = await this.createUser.create(body)
      const user = await this.findUserById.find(id)
      return created(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
