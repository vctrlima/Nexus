import { makeFindPostsByParams } from '@server/main/factories/use-cases';
import { FindPostsByParamsController } from '@server/presentation/controllers';

export const makeFindPostsByParamsController =
  (): FindPostsByParamsController =>
    new FindPostsByParamsController(makeFindPostsByParams());
