import { PostRepository } from '@/data/protocols/db'
import { FindPostById } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindPostById } from './db-find-post-by-id'

const createPostRepositoryMock = (): PostRepository => {
  return {
    findById: jest.fn(),
  } as unknown as PostRepository
}

describe('DbFindPostById', () => {
  let postRepositoryMock: PostRepository
  let dbFindPostById: DbFindPostById

  beforeEach(() => {
    postRepositoryMock = createPostRepositoryMock()
    dbFindPostById = new DbFindPostById(postRepositoryMock)
  })

  it('should find a post by id', async () => {
    const postId = faker.string.uuid()
    const foundPost: FindPostById.Model = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    }
    jest
      .spyOn(postRepositoryMock, 'findById')
      .mockImplementationOnce(async () => foundPost)

    const result = await dbFindPostById.find(postId)

    expect(postRepositoryMock.findById).toHaveBeenCalledWith(postId)
    expect(result).toEqual(foundPost)
  })
})
