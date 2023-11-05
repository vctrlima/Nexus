import { FindPostById, UpdatePost } from '@server/domain/use-cases';
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

export class UpdatePostController implements Controller {
  constructor(
    private readonly updatePost: UpdatePost,
    private readonly findPostById: FindPostById
  ) {}

  async handle(
    request: HttpRequest<UpdatePost.Params>
  ): Promise<HttpResponse<any>> {
    try {
      const { body } = request;
      const { id } = request.params;
      if (!body) return badRequest(new MissingParamError('body'));
      body.id = id;
      const foundPost = await this.findPostById.findById({ id });
      if (foundPost.author.id !== request.user.id) return unauthorized();
      const post = await this.updatePost.update(body);
      return ok(post);
    } catch (error) {
      return serverError(error);
    }
  }
}
