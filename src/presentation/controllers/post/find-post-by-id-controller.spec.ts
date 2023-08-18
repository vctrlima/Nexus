import { Post } from '@/domain/entities'
import { FindPostById } from '@/domain/use-cases'
import { ok, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { faker } from '@faker-js/faker'
import { FindPostByIdController } from './find-post-by-id-controller'

const findPostByIdMock = (): FindPostById => ({
  find: jest.fn(),
})

describe('FindPostByIdController', () => {
  let findPostById: FindPostById
  let findPostByIdController: FindPostByIdController

  beforeEach(() => {
    findPostById = findPostByIdMock()
    findPostByIdController = new FindPostByIdController(findPostById)
  })

  it('should find a post by id and return 200', async () => {
    const postId = faker.string.uuid()
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    }
    jest.spyOn(findPostById, 'find').mockResolvedValue(foundPost)
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
    }

    const response = await findPostByIdController.handle(request)

    expect(findPostById.find).toHaveBeenCalledWith(postId)
    expect(response).toEqual(ok(foundPost))
  })

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const postId = faker.string.uuid()
    jest
      .spyOn(findPostById, 'find')
      .mockRejectedValue(new Error('Error finding post'))
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
    }

    const response = await findPostByIdController.handle(request)

    expect(findPostById.find).toHaveBeenCalledWith(postId)
    expect(response).toEqual(serverError(new Error('Error finding post')))
  })
})