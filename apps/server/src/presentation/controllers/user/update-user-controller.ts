import { UpdateUser } from '@server/domain/use-cases';
import { MissingParamError } from '@server/presentation/errors';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';
import {
  EmailValidation,
  PasswordValidation,
} from '@server/validation/validators';

export class UpdateUserController implements Controller {
  constructor(
    private readonly updateUser: UpdateUser,
    private readonly emailValidation: EmailValidation,
    private readonly passwordValidation: PasswordValidation
  ) {}

  async handle(
    request: HttpRequest<UpdateUser.Params>
  ): Promise<HttpResponse<UpdateUser.Model>> {
    try {
      const { id } = request.params;
      if (id !== request.user.id) return unauthorized();
      const { body } = request;
      if (!body) return badRequest(new MissingParamError('body'));
      body.id = id;
      const invalidEmail = this.emailValidation.validate(body.email);
      if (invalidEmail) return badRequest(invalidEmail);
      const invalidPassword = this.passwordValidation.validate(body.password);
      if (invalidPassword) return badRequest(invalidPassword);
      const user = await this.updateUser.update(body);
      return ok(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
