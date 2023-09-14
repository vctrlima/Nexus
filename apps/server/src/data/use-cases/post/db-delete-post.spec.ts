import { DeletePostRepository } from '@server/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeletePost } from './db-delete-post'

const deletePostRepositoryMock = (): DeletePostRepository => {
  return {
    delete: jest.fn(),
  } as DeletePostRepository
}

describe('DbDeletePost', () => {
  let deletePostRepository: DeletePostRepository
  let dbDeletePost: DbDeletePost

  beforeEach(() => {
    deletePostRepository = deletePostRepositoryMock()
    dbDeletePost = new DbDeletePost(deletePostRepository)
  })

  it('should delete a post by id', async () => {
    const postId = faker.string.uuid()
    jest
      .spyOn(deletePostRepository, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeletePost.delete(postId)

    expect(deletePostRepository.delete).toHaveBeenCalledWith(postId)
  })
})
