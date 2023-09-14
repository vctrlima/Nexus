import { InvalidFieldError } from '@server/validation/errors'
import { PasswordValidation } from './password-validation'

describe('PasswordValidation', () => {
  it('should return null if password is valid', () => {
    const passwordValidation = new PasswordValidation()

    expect(passwordValidation.validate('Password123!')).toBeNull()
    expect(passwordValidation.validate('Test@123')).toBeNull()
    expect(passwordValidation.validate('SuperSecret12!@')).toBeNull()
  })

  it('should return an InvalidFieldError if password is invalid', () => {
    const passwordValidation = new PasswordValidation()

    expect(passwordValidation.validate('')).toBeInstanceOf(InvalidFieldError)
    expect(passwordValidation.validate('123456789')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('password')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('password123')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('PASSWORD123')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('Test@')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('test@123')).toBeInstanceOf(
      InvalidFieldError,
    )
    expect(passwordValidation.validate('Test@')).toBeInstanceOf(
      InvalidFieldError,
    )
  })
})
