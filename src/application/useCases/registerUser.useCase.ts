import { User, UserPrimitive } from 'src/domain/entities'
import { RegisterUserDto } from '../dtos/user.dto'
import { UserAlreadyExistException } from 'src/domain/exceptions'
import { HashService, JwtService } from 'src/domain/services'
import { UserRepository } from 'src/domain/repositories'
export class RegisterUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    dto: RegisterUserDto,
  ): Promise<{ token: string; user: Omit<UserPrimitive, 'password'> }> {
    const userExist = await this.userRepo.findByEmail(dto.email)

    if (userExist) {
      throw new UserAlreadyExistException()
    }

    const hashedPassword = await this.hashService.hashPassword(dto.password)
    const user = User.fromPrimitives({
      ...dto,
      password: hashedPassword,
    })

    await this.userRepo.save(user)

    const { password, ...payload } = dto
    const token = this.jwtService.sign(payload)

    return { token, user: payload }
  }
}
