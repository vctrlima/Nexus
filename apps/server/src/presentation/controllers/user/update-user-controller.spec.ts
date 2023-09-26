import { faker } from '@faker-js/faker';
import { UpdateUser } from '@server/domain/use-cases';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import {
  EmailValidation,
  PasswordValidation,
} from '@server/validation/validators';
import { UpdateUserController } from './update-user-controller';

const updateUserMock = (): UpdateUser => ({
  update: jest.fn(),
});

const emailValidationMock = (): EmailValidation => ({
  validate: jest.fn(),
});

const passwordValidationMock = (): PasswordValidation => ({
  capitalLettersRegExp: /(?=.*[A-Z])/.source,
  numbersRegExp: /(?=.*[0-9])/.source,
  symbolsRegExp: /(?=.*[!@#$%^&*])/.source,
  validate: jest.fn(),
});

describe('UpdateUserController', () => {
  let updateUser: UpdateUser;
  let emailValidation: EmailValidation;
  let passwordValidation: PasswordValidation;
  let updateUserController: UpdateUserController;

  beforeEach(() => {
    updateUser = updateUserMock();
    emailValidation = emailValidationMock();
    passwordValidation = passwordValidationMock();
    updateUserController = new UpdateUserController(
      updateUser,
      emailValidation,
      passwordValidation
    );
  });

  it('should update an user and return 200 OK', async () => {
    const userId = faker.string.uuid();
    const email = faker.internet.email();
    const password = '@Abc1234';
    const name = faker.person.fullName();
    const updateParams: UpdateUser.Params = {
      email,
      password,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null);
    jest.spyOn(passwordValidation, 'validate').mockReturnValue(null);
    jest.spyOn(updateUser, 'update').mockResolvedValue(updateParams);
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: userId },
      body: updateParams,
    };

    const response = await updateUserController.handle(request);

    expect(emailValidation.validate).toHaveBeenCalledWith(email);
    expect(passwordValidation.validate).toHaveBeenCalledWith(password);
    expect(updateUser.update).toHaveBeenCalledWith(updateParams);
    expect(response).toEqual(ok(updateParams));
  });

  it('should throw MissingParamError if body is not provided', async () => {
    const userId = faker.string.uuid();
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: userId },
    };

    const response = await updateUserController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: body')));
  });

  it('should return unauthorized if user id is not provided', async () => {
    const userId = faker.string.uuid();
    const email = faker.internet.email();
    const password = '@Abc1234';
    const updateParams: UpdateUser.Params = {
      email,
      password: password,
      name: faker.person.fullName(),
    };
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: undefined },
      body: updateParams,
    };

    const response = await updateUserController.handle(request);

    expect(response).toEqual(unauthorized());
  });

  it('should return 400 if email validation fails', async () => {
    const userId = faker.string.uuid();
    const email = 'testemail.com';
    const updateParams: UpdateUser.Params = {
      email: email,
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };
    const emailValidationError = new Error('Invalid email');
    jest
      .spyOn(emailValidation, 'validate')
      .mockReturnValue(emailValidationError);
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: userId },
      body: updateParams,
    };

    const response = await updateUserController.handle(request);

    expect(emailValidation.validate).toHaveBeenCalledWith(email);
    expect(response).toEqual(badRequest(emailValidationError));
  });

  it('should return 400 if password validation fails', async () => {
    const userId = faker.string.uuid();
    const email = faker.internet.email();
    const password = 'password';
    const updateParams: UpdateUser.Params = {
      email,
      password,
      name: faker.person.fullName(),
    };
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null);
    const passwordValidationError = new Error('Invalid password');
    jest
      .spyOn(passwordValidation, 'validate')
      .mockReturnValue(passwordValidationError);
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: userId },
      body: updateParams,
    };

    const response = await updateUserController.handle(request);

    expect(emailValidation.validate).toHaveBeenCalledWith(email);
    expect(passwordValidation.validate).toHaveBeenCalledWith(password);
    expect(response).toEqual(badRequest(passwordValidationError));
  });

  it('should return 500 if an error occurs', async () => {
    const userId = faker.string.uuid();
    const email = faker.internet.email();
    const password = '@Abc1234';
    const updateParams: UpdateUser.Params = {
      email,
      password: password,
      name: faker.person.fullName(),
    };
    jest.spyOn(emailValidation, 'validate').mockReturnValue(null);
    jest.spyOn(passwordValidation, 'validate').mockReturnValue(null);
    jest
      .spyOn(updateUser, 'update')
      .mockRejectedValue(new Error('Error creating user'));
    const request: HttpRequest<UpdateUser.Params> = {
      params: { id: userId },
      user: { id: userId },
      body: updateParams,
    };

    const response = await updateUserController.handle(request);

    expect(emailValidation.validate).toHaveBeenCalledWith(email);
    expect(passwordValidation.validate).toHaveBeenCalledWith(password);
    expect(response).toEqual(serverError(new Error('Error creating user')));
  });
});
