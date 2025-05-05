import { User } from 'src/domain/entities'
import { UserUnAuthorizedException } from 'src/domain/exceptions'
import { UserRepository } from 'src/domain/repositories'
import { HashService, JwtService } from 'src/domain/services'
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email)

    if (
      !user &&
      !(await this.hashService.comparePassword(password, user!.password))
    ) {
      throw new UserUnAuthorizedException()
    }

    const { password: _p, ...obj } = user as User
    const token = this.jwtService.sign(obj)
    return { token }
  }
}
