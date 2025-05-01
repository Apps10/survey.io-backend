import { User } from '../entities'
import { GenericRepository } from './generic.repository'

export type UserRepository = GenericRepository<User>
