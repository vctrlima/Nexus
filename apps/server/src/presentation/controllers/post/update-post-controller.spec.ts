import { UpdatePost } from '@server/domain/use-cases'
import { badRequest, ok, serverError } from '@server/presentation/helpers'
import { HttpRequest } from '@server/presentation/protocols'
import { faker } from '@faker-js/faker'
import { UpdatePostController } from './update-post-controller'

const updatePostMock = (): UpdatePost => ({
  update: jest.fn(),
})

describe('UpdatePostController', () => {
  let updatePost: UpdatePost
  let updatePostController: UpdatePostController

  beforeEach(() => {
    updatePost = updatePostMock()
    updatePostController = new UpdatePostController(updatePost)
  })

  it('should update a post and return 200 OK', async () => {
    const postId = faker.string.uuid()
    const updateData: UpdatePost.Params = {
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
    const updatedPost = updateData
    jest.spyOn(updatePost, 'update').mockResolvedValue(updateData)
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: postId },
      body: updateData,
    }

    const response = await updatePostController.handle(request)

    expect(updatePost.update).toHaveBeenCalledWith(updateData)
    expect(response).toEqual(ok(updatedPost))
  })

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: faker.string.uuid() },
    }

    const response = await updatePostController.handle(request)

    expect(response).toEqual(badRequest(new Error('Missing param: body')))
  })

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const postId = faker.string.uuid()
    const updateData: UpdatePost.Params = {
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
      .spyOn(updatePost, 'update')
      .mockRejectedValue(new Error('Error updating post'))
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: postId },
      body: updateData,
    }

    const response = await updatePostController.handle(request)

    expect(updatePost.update).toHaveBeenCalledWith(updateData)
    expect(response).toEqual(serverError(new Error('Error updating post')))
  })
})
