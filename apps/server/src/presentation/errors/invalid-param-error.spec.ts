import { InvalidParamError } from './invalid-param-error'

describe('InvalidParamError', () => {
  it('should have the correct error message', () => {
    const paramName = 'email'

    const error = new InvalidParamError(paramName)

    expect(error.message).toBe(`Invalid param: ${paramName}`)
  })

  it('should have the correct error name', () => {
    const error = new InvalidParamError('password')

    expect(error.name).toBe('InvalidParamError')
  })

  it('should inherit from Error', () => {
    const error = new InvalidParamError('name')

    expect(error instanceof Error).toBe(true)
  })
})
