import { CreateLike } from '@server/domain/use-cases';
import { MissingParamError } from '@server/presentation/errors';
import { badRequest, created, serverError } from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';

export class CreateLikeController implements Controller {
  constructor(private readonly createLike: CreateLike) {}

  async handle(
    request: HttpRequest<CreateLike.Params>
  ): Promise<HttpResponse<CreateLike.Model>> {
    try {
      const { body } = request;
      if (!body) return badRequest(new MissingParamError('body'));
      body.user = { id: request.user.id };
      const like = await this.createLike.create(body);
      return created(like);
    } catch (error) {
      return serverError(error);
    }
  }
}
