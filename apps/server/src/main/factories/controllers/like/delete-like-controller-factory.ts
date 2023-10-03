import {
  makeDeleteLike,
  makeFindLikeById,
} from '@server/main/factories/use-cases';
import { DeleteLikeController } from '@server/presentation/controllers';

export const makeDeleteLikeController = (): DeleteLikeController =>
  new DeleteLikeController(makeDeleteLike(), makeFindLikeById());
