export interface ParameterValidation {
  validate: (input: string) => Error | null
}
