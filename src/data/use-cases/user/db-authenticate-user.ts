import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { UserRepository } from '@/data/protocols/db'
import { AuthenticateUser } from '@/domain/use-cases'
import { AccessDeniedError } from '@/presentation/errors'

export class DbAuthenticateUser implements AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth(params: AuthenticateUser.Params): Promise<AuthenticateUser.Model> {
    const user = await this.userRepository.findByEmail(params.email)
    if (!user) throw new AccessDeniedError()
    const isValid = await this.hashComparer.compare(
      params.password,
      user.password,
    )
    if (!isValid || !user.id) throw new AccessDeniedError()
    const accessToken = await this.encrypter.encrypt(user.id)
    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    }
  }
}
