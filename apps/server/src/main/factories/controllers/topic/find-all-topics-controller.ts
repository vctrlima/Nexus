import { makeFindAllTopics } from '@server/main/factories/use-cases';
import { FindAllTopicsController } from '@server/presentation/controllers';

export const makeFindAllTopicsController = (): FindAllTopicsController =>
  new FindAllTopicsController(makeFindAllTopics());
