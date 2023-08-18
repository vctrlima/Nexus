import { DeletePost } from '@/domain/use-cases'
import { noContent, serverError } from '@/presentation/helpers'
import { HttpRequest } from '@/presentation/protocols'
import { faker } from '@faker-js/faker'
import { DeletePostController } from './delete-post-controller'

const deletePostMock = (): DeletePost => ({
  delete: jest.fn(),
})

describe('DeletePostController', () => {
  let deletePost: DeletePost
  let deletePostController: DeletePostController

  beforeEach(() => {
    deletePost = deletePostMock()
    deletePostController = new DeletePostController(deletePost)
  })

  it('should delete a post by id and return 204', async () => {
    const postId = faker.string.uuid()
    jest.spyOn(deletePost, 'delete').mockResolvedValue()
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
    }

    const response = await deletePostController.handle(request)

    expect(deletePost.delete).toHaveBeenCalledWith(postId)
    expect(response).toEqual(noContent())
  })

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const postId = faker.string.uuid()
    jest
      .spyOn(deletePost, 'delete')
      .mockRejectedValue(new Error('Error deleting post'))
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
    }

    const response = await deletePostController.handle(request)

    expect(deletePost.delete).toHaveBeenCalledWith(postId)
    expect(response).toEqual(serverError(new Error('Error deleting post')))
  })
})
