import { Body, Controller, Post } from '@nestjs/common'
import { UserRegisterHttpDto } from '../http-dtos/userRegister.http-dto'
import { InjectCustom } from 'src/shared/decorators'
import {
  USER_USE_CASES_FACTORY,
  UserUseCaseFactory,
} from 'src/application/factories/userUseCases.factory'

@Controller('users')
export class RegisterUserController {
  constructor(
    @InjectCustom(USER_USE_CASES_FACTORY)
    private readonly userUseCaseFactory: UserUseCaseFactory,
  ) {}

  @Post('/register')
  async run(@Body() dto: UserRegisterHttpDto) {
    const useCase = this.userUseCaseFactory.registerUser()
    return await useCase.execute(dto)
  }
}
