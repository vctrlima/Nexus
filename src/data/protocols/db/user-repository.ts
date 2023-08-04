import { User } from '@/domain/entities'

export interface UserRepository {
  create: (user: User) => Promise<{ id: string }>
  findById: (id: string) => Promise<User>
}
