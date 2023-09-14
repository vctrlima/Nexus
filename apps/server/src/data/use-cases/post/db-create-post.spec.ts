import { CreatePostRepository } from '@server/data/protocols/db'
import { CreatePost } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreatePost } from './db-create-post'

const createPostRepositoryMock = (): CreatePostRepository => {
  return {
    create: jest.fn(),
  } as CreatePostRepository
}

describe('DbCreatePost', () => {
  let createPostRepository: CreatePostRepository
  let dbCreatePost: DbCreatePost

  beforeEach(() => {
    createPostRepository = createPostRepositoryMock()
    dbCreatePost = new DbCreatePost(createPostRepository)
  })

  it('should create a new post', async () => {
    const createParams: CreatePost.Params = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
      },
    }
    const createdPost: CreatePost.Model = { id: faker.string.uuid() }
    jest
      .spyOn(createPostRepository, 'create')
      .mockImplementationOnce(async () => createdPost)

    const result = await dbCreatePost.create(createParams)

    expect(createPostRepository.create).toHaveBeenCalledWith(createParams)
    expect(result).toEqual(createdPost)
  })
})
