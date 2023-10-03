import { CreateLikeRepository } from '@server/data/protocols/db';
import { CreateLike } from '@server/domain/use-cases';

export class DbCreateLike implements CreateLike {
  constructor(private readonly createLikeRepository: CreateLikeRepository) {}

  async create(params: CreateLike.Params): Promise<CreateLike.Model> {
    return await this.createLikeRepository.create(params);
  }
}
