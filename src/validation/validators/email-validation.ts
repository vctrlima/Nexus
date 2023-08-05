import { InvalidFieldError } from '@/validation/errors'
import { type ParameterValidation } from '@/validation/protocols'

export class EmailValidation implements ParameterValidation {
  validate(input: string): Error | null {
    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    return emailRegExp.test(input) ? null : new InvalidFieldError('email')
  }
}
