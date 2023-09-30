import { FindAllTopics } from '@server/domain/use-cases';
import { ok, serverError } from '@server/presentation/helpers';
import { Controller, HttpResponse } from '@server/presentation/protocols';

export class FindAllTopicsController implements Controller {
  constructor(private readonly findAllTopics: FindAllTopics) {}

  async handle(): Promise<HttpResponse<FindAllTopics.Model>> {
    try {
      const topics = await this.findAllTopics.findAll();
      return ok(topics);
    } catch (error) {
      return serverError(error);
    }
  }
}
