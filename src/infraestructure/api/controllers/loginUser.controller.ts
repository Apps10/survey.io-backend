import { Body, Controller, Post } from '@nestjs/common'
import { InjectCustom } from 'src/shared/decorators'
import {
  USER_USE_CASES_FACTORY,
  UserUseCaseFactory,
} from 'src/application/factories/userUseCases.factory'
import { UserLoginHttpDto } from '../http-dtos/userLogin.http-dto'

@Controller('users')
export class LoginUserController {
  constructor(
    @InjectCustom(USER_USE_CASES_FACTORY)
    private readonly userUseCaseFactory: UserUseCaseFactory,
  ) {}

  @Post('/login')
  async run(@Body() dto: UserLoginHttpDto) {
    const useCase = this.userUseCaseFactory.loginUser()
    return await useCase.execute(dto.email, dto.password)
  }
}
