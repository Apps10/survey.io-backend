import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'
import { InjectCustom } from 'src/shared/decorators'
import { SurveyVoteHttpDto } from '../http-dtos/surveyVote.http-dto'
import { JwtAuthGuard } from 'src/infraestructure/guards/jwtAuth.guard'
import { AllowRoles } from 'src/infraestructure/decorators/roles.decorator'
import { RolesGuard } from 'src/infraestructure/guards/roles.guard'
import { UserDecorator } from 'src/infraestructure/decorators/user.decorator'
import { User } from 'src/domain/entities'

@Controller('surveys')
export class VoteSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(201)
  @Post('vote')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowRoles('admin', 'user')
  async run(@Body() dto: SurveyVoteHttpDto, @UserDecorator() user: User) {
    const useCase = this.surveUseCaseFactory.voteSurvey()
    await useCase.execute({ ...dto, userId: user.id })
    return {
      message: 'ok',
    }
  }
}
