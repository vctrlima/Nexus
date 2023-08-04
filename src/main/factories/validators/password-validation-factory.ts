import { PasswordValidation } from '@/validation/validators'

export const makePasswordValidation = (): PasswordValidation =>
  new PasswordValidation()
