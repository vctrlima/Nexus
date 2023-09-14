import { PasswordValidation } from '@server/validation/validators'

export const makePasswordValidation = (): PasswordValidation =>
  new PasswordValidation()
