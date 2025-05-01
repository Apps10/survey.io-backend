import { User } from 'src/domain/entities'
import { UserUnAuthorizedException } from 'src/domain/exceptions/user.exception'
import { UserRepository } from 'src/domain/repositories/user.respository'
import { HashService } from 'src/domain/services/hash.service'

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)

    if (
      !user &&
      !(await this.hashService.comparePassword(password, user!.password))
    ) {
      throw new UserUnAuthorizedException()
    }

    return user as User
  }
}
