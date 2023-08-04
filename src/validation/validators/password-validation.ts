import { InvalidFieldError } from '@/validation/errors'
import { type ParameterValidation } from '@/validation/protocols'

export class PasswordValidation implements ParameterValidation {
  private get capitalLettersRegExp(): string {
    return /(?=.*[A-Z])/.source
  }

  private get numbersRegExp(): string {
    return /(?=.*[0-9])/.source
  }

  private get symbolsRegExp(): string {
    return /(?=.*[!@#$%^&*])/.source
  }

  validate(input: string): Error | null {
    const passwordRegExp = new RegExp(
      this.capitalLettersRegExp + this.numbersRegExp + this.symbolsRegExp,
    )

    return !input || passwordRegExp.test(input)
      ? null
      : new InvalidFieldError('password')
  }
}
