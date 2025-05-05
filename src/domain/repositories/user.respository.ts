import { User } from '../entities'
import { GenericRepository } from './generic.repository'

export const USER_REPOSITORY = Symbol('UserRepository')
export interface UserRepository extends GenericRepository<User> {
  findByEmail(email: string): Promise<User | null>
}
