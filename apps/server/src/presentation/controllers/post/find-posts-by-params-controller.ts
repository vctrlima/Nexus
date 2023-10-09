import { Post } from '@server/domain/entities';
import { FindPostsByParams } from '@server/domain/use-cases';
import { ok, serverError } from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';

export class FindPostsByParamsController implements Controller {
  constructor(private readonly findPostsByParams: FindPostsByParams) {}

  async handle(request: HttpRequest): Promise<HttpResponse<Post>> {
    try {
      const { skip, take } = request.query;
      let params: FindPostsByParams.Params = { skip, take };
      if (request.query.keywords) {
        params = { ...params, keywords: request.query.keywords };
      }
      if (request.query.topics) {
        params = { ...params, topics: request.query.topics.split(',') };
      }
      if (request.user?.id) {
        params = { ...params, user: request.user };
      }
      const post = await this.findPostsByParams.findManyByParams(params);
      return ok(post);
    } catch (error) {
      return serverError(error);
    }
  }
}
