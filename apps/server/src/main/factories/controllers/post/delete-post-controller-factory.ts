import {
  makeDeletePost,
  makeFindPostById,
} from '@server/main/factories/use-cases';
import { DeletePostController } from '@server/presentation/controllers';

export const makeDeletePostController = (): DeletePostController =>
  new DeletePostController(makeDeletePost(), makeFindPostById());
