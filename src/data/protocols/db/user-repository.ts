import { User } from '@/domain/entities'

export interface UserRepository {
  create: (user: User) => Promise<{ id: string }>
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  update: (user: User) => Promise<User>
  delete: (id: string) => Promise<void>
}
