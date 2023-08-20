import { PostRepository } from '@/data/protocols/db'
import { CreatePost } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreatePost } from './db-create-post'

const createPostRepositoryMock = (): PostRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as PostRepository
}

describe('DbCreatePost', () => {
  let postRepositoryMock: PostRepository
  let dbCreatePost: DbCreatePost

  beforeEach(() => {
    postRepositoryMock = createPostRepositoryMock()
    dbCreatePost = new DbCreatePost(postRepositoryMock)
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
      .spyOn(postRepositoryMock, 'create')
      .mockImplementationOnce(async () => createdPost)

    const result = await dbCreatePost.create(createParams)

    expect(postRepositoryMock.create).toHaveBeenCalledWith(createParams)
    expect(result).toEqual(createdPost)
  })
})
