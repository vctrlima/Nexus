import { EmailValidation } from '@server/validation/validators'

export const makeEmailValidation = (): EmailValidation => new EmailValidation()
