import { User } from '../entities'
import { GenericRepository } from './generic.repository'

export interface UserRepository extends GenericRepository<User> {
  findByEmail(email: string): Promise<User | null>
}
