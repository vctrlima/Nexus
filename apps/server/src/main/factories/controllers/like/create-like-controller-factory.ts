import { makeCreateLike } from '@server/main/factories/use-cases';
import { CreateLikeController } from '@server/presentation/controllers';

export const makeCreateLikeController = (): CreateLikeController =>
  new CreateLikeController(makeCreateLike());
