import {
  makeFindPostById,
  makeUpdatePost,
} from '@server/main/factories/use-cases';
import { UpdatePostController } from '@server/presentation/controllers';

export const makeUpdatePostController = (): UpdatePostController =>
  new UpdatePostController(makeUpdatePost(), makeFindPostById());
