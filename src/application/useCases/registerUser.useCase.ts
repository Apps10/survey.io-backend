import { HashService } from 'src/domain/services/hash.service'
import { UserPrismaRepository } from 'src/infraestructure/repositories'

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserPrismaRepository,
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
