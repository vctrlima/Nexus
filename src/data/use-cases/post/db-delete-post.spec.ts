import { PostRepository } from '@/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeletePost } from './db-delete-post'

const createPostRepositoryMock = (): PostRepository => {
  return {
    delete: jest.fn(),
  } as unknown as PostRepository
}

describe('DbDeletePost', () => {
  let postRepositoryMock: PostRepository
  let dbDeletePost: DbDeletePost

  beforeEach(() => {
    postRepositoryMock = createPostRepositoryMock()
    dbDeletePost = new DbDeletePost(postRepositoryMock)
  })

  it('should delete a post by id', async () => {
    const postId = faker.string.uuid()
    jest
      .spyOn(postRepositoryMock, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeletePost.delete(postId)

    expect(postRepositoryMock.delete).toHaveBeenCalledWith(postId)
  })
})
