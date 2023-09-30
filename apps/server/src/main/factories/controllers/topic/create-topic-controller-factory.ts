import { makeCreateTopic } from '@server/main/factories/use-cases';
import { CreateTopicController } from '@server/presentation/controllers';

export const makeCreateTopicController = (): CreateTopicController =>
  new CreateTopicController(makeCreateTopic());
