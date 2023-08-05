import { EmailInUseError } from './email-in-use-error'

describe('EmailInUseError', () => {
  it('should have the correct error message', () => {
    const error = new EmailInUseError()

    expect(error.message).toBe('The received email is already in use')
  })

  it('should have the correct error name', () => {
    const error = new EmailInUseError()

    expect(error.name).toBe('EmailInUseError')
  })

  it('should inherit from Error', () => {
    const error = new EmailInUseError()

    expect(error instanceof Error).toBe(true)
  })
})
