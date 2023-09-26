import { CreateTopic } from '@server/domain/use-cases';
import { MissingParamError } from '@server/presentation/errors';
import { badRequest, created, serverError } from '@server/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@server/presentation/protocols';

export class CreateTopicController implements Controller {
  constructor(private readonly createTopic: CreateTopic) {}

  async handle(
    request: HttpRequest<CreateTopic.Params>
  ): Promise<HttpResponse<CreateTopic.Model>> {
    try {
      const { body } = request;
      if (!body) return badRequest(new MissingParamError('body'));
      const topic = await this.createTopic.create(body);
      return created(topic);
    } catch (error) {
      return serverError(error);
    }
  }
}
