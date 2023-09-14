import { CreateUser, FindUserById } from '@server/domain/use-cases'
import { badRequest, created, serverError } from '@server/presentation/helpers'
import { HttpRequest } from '@server/presentation/protocols'
import { EmailValidation, PasswordValidation } from '@server/validation/validators'
import { faker } from '@faker-js/faker'
import { CreateUserController } from './create-user-controller'

const createUserMock = (): CreateUser => ({
  create: jest.fn(),
})

const findUserByIdMock = (): FindUserById => ({
  find: jest.fn(),
})

const emailValidationMock = (): EmailValidation => ({
  validate: jest.fn(),
})

const passwordValidationMock = (): PasswordValidation => ({
  capitalLettersRegExp: /(?=.*[A-Z])/.source,
  numbersRegExp: /(?=.*[0-9])/.source,
  symbolsRegExp: /(?=.*[!@#$%^&*])/.source,
  validate: jest.fn(),
})

describe('CreateUserController', () => {
  let createUser: CreateUser
  let findUserById: FindUserById
  let emailValidation: EmailValidation
  let passwordValidation: PasswordValidation
  let createUserController: CreateUserController

  beforeEach(() => {
    createUser = createUserMock()
    findUserById = findUserByIdMock()
    emailValidation = emailValidationMock()
    passwordValidation = passwordValidationMock()
    createUserController = new CreateUserController(
      createUser,
      findUserById,
      emailValidation,
      passwordValidation,
    )
  })

  it('should create a new user and return 201 Created', async () => {
    const id = faker.string.uuid()
    const email = faker.internet.email()
    const password = '@Abc1234'
    const name = faker.person.fullName()
    const createParams: CreateUser.Params = {
      email,
      password,
      name,
    }
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null)
    jest.spyOn(passwordValidation, 'validate').mockReturnValue(null)
    const createdUser = { id }
    jest.spyOn(createUser, 'create').mockResolvedValue(createdUser)
    const foundUser: FindUserById.Model = { id, email, name, password }
    jest.spyOn(findUserById, 'find').mockResolvedValue(foundUser)
    const request: HttpRequest<CreateUser.Params> = { body: createParams }

    const response = await createUserController.handle(request)

    expect(emailValidation.validate).toHaveBeenCalledWith(email)
    expect(passwordValidation.validate).toHaveBeenCalledWith(password)
    expect(createUser.create).toHaveBeenCalledWith(createParams)
    expect(findUserById.find).toHaveBeenCalledWith(createdUser.id)
    expect(response).toEqual(created(foundUser))
  })

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<CreateUser.Params> = {}

    const response = await createUserController.handle(request)

    expect(response).toEqual(badRequest(new Error('Missing param: body')))
  })

  it('should return 400 if email validation fails', async () => {
    const email = faker.internet.email()
    const createParams: CreateUser.Params = {
      email: email,
      password: faker.internet.password(),
      name: faker.person.fullName(),
    }
    const emailValidationError = new Error('Invalid email')
    jest
      .spyOn(emailValidation, 'validate')
      .mockReturnValue(emailValidationError)
    const request: HttpRequest<CreateUser.Params> = {
      body: createParams,
    }

    const response = await createUserController.handle(request)

    expect(emailValidation.validate).toHaveBeenCalledWith(email)
    expect(response).toEqual(badRequest(emailValidationError))
  })

  it('should return 400 if password validation fails', async () => {
    const email = faker.internet.email()
    const password = 'password'
    const createParams: CreateUser.Params = {
      email,
      password,
      name: faker.person.fullName(),
    }
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null)
    const passwordValidationError = new Error('Invalid password')
    jest
      .spyOn(passwordValidation, 'validate')
      .mockReturnValue(passwordValidationError)
    const request: HttpRequest<CreateUser.Params> = {
      body: createParams,
    }

    const response = await createUserController.handle(request)

    expect(emailValidation.validate).toHaveBeenCalledWith(email)
    expect(passwordValidation.validate).toHaveBeenCalledWith(password)
    expect(response).toEqual(badRequest(passwordValidationError))
  })

  it('should return 500 if an error occurs', async () => {
    const email = faker.internet.email()
    const password = '@Abc1234'
    const createParams: CreateUser.Params = {
      email,
      password: password,
      name: faker.person.fullName(),
    }
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null)
    jest.spyOn(passwordValidation, 'validate').mockReturnValue(null)
    jest
      .spyOn(createUser, 'create')
      .mockRejectedValue(new Error('Error creating user'))
    const request: HttpRequest<CreateUser.Params> = {
      body: createParams,
    }

    const response = await createUserController.handle(request)

    expect(emailValidation.validate).toHaveBeenCalledWith(email)
    expect(passwordValidation.validate).toHaveBeenCalledWith(password)
    expect(response).toEqual(serverError(new Error('Error creating user')))
  })
})
