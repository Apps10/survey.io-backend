import { LoginUserUseCase, RegisterUserUseCase } from '../useCases'

export const USER_USE_CASES_FACTORY = Symbol('UserUseCaseFactory')
export interface UserUseCaseFactory {
  registerUser(): RegisterUserUseCase
  loginUser(): LoginUserUseCase
}
