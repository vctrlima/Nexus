import { InvalidFieldError } from '@server/validation/errors'
import { EmailValidation } from './email-validation'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  it('should return null if email is valid', () => {
    const emailValidation = new EmailValidation()

    expect(emailValidation.validate(faker.internet.email())).toBeNull()
    expect(emailValidation.validate(faker.internet.email())).toBeNull()
    expect(emailValidation.validate(faker.internet.email())).toBeNull()
  })

  it('should return an InvalidFieldError if email is invalid', () => {
    const emailValidation = new EmailValidation()

    expect(emailValidation.validate('')).toBeInstanceOf(InvalidFieldError)
    expect(emailValidation.validate('test@example')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(emailValidation.validate('test@example.')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(emailValidation.validate('test@example..com')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(emailValidation.validate('@example.com')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(emailValidation.validate('test@.com')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(emailValidation.validate('test@example..com')).toBeInstanceOf(
      InvalidFieldError,
    )
  })
})
