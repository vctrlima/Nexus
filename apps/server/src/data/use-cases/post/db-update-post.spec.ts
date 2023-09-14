import { UpdatePostRepository } from '@server/data/protocols/db'
import { Post } from '@server/domain/entities'
import { UpdatePost } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbUpdatePost } from './db-update-post'

const updatePostRepositoryMock = (): UpdatePostRepository => {
  return {
    update: jest.fn(),
  } as UpdatePostRepository
}

describe('DbUpdatePost', () => {
  let updatePostRepository: UpdatePostRepository
  let dbUpdatePost: UpdatePost

  beforeEach(() => {
    updatePostRepository = updatePostRepositoryMock()
    dbUpdatePost = new DbUpdatePost(updatePostRepository)
  })

  it('should update a post', async () => {
    const updateData: Post = {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const updatedPost = updateData
    jest
      .spyOn(updatePostRepository, 'update')
      .mockImplementationOnce(async () => updatedPost)

    const result = await dbUpdatePost.update(updateData)

    expect(updatePostRepository.update).toHaveBeenCalledWith(updateData)
    expect(result).toEqual(updatedPost)
  })
})
