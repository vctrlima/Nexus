import { PostRepository } from '@/data/protocols/db'
import { Post } from '@/domain/entities'
import { UpdatePost } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbUpdatePost } from './db-update-post'

const postRepositoryMock = (): PostRepository => ({
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
})

describe('DbUpdatePost', () => {
  let postRepository: PostRepository
  let dbUpdatePost: UpdatePost

  beforeEach(() => {
    postRepository = postRepositoryMock()
    dbUpdatePost = new DbUpdatePost(postRepository)
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
      .spyOn(postRepository, 'update')
      .mockImplementationOnce(async () => updatedPost)

    const result = await dbUpdatePost.update(updateData)

    expect(postRepository.update).toHaveBeenCalledWith(updateData)
    expect(result).toEqual(updatedPost)
  })
})
