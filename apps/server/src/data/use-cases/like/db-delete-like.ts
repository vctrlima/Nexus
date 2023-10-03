import { DeleteLikeRepository } from '@server/data/protocols/db';
import { DeleteLike } from '@server/domain/use-cases';

export class DbDeleteLike implements DeleteLike {
  constructor(private readonly deleteLikeRepository: DeleteLikeRepository) {}

  async delete(params: DeleteLike.Params): Promise<DeleteLike.Model> {
    return await this.deleteLikeRepository.delete(params);
  }
}
