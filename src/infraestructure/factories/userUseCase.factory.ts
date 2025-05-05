import { UserUseCaseFactory } from 'src/application/factories/userUseCases.factory'
import { LoginUserUseCase, RegisterUserUseCase } from 'src/application/useCases'
import { USER_REPOSITORY, UserRepository } from 'src/domain/repositories'
import {
  HASH_SERVICE,
  HashService,
  JWT_SERVICE,
  JwtService,
} from 'src/domain/services'
import { InjectableCustom, InjectCustom } from 'src/shared/decorators'

@InjectableCustom()
export class UserUseCaseFactoryImp implements UserUseCaseFactory {
  constructor(
    @InjectCustom(USER_REPOSITORY) private readonly userRepo: UserRepository,
    @InjectCustom(HASH_SERVICE) private readonly hashService: HashService,
    @InjectCustom(JWT_SERVICE) private readonly jwtService: JwtService,
  ) {}
  loginUser(): LoginUserUseCase {
    return new LoginUserUseCase(
      this.userRepo,
      this.hashService,
      this.jwtService,
    )
  }

  registerUser(): RegisterUserUseCase {
    return new RegisterUserUseCase(
      this.userRepo,
      this.hashService,
      this.jwtService,
    )
  }
}
