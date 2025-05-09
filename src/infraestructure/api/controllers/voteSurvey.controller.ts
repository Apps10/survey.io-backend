import { Throttle } from '@nestjs/throttler'
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { InjectCustom } from 'src/shared/decorators'
import { SurveyVoteHttpDto } from '../http-dtos/surveyVote.http-dto'
import { UserDecorator, AllowRoles } from 'src/infraestructure/decorators'
import { User } from 'src/domain/entities'
import {
  CustomSurveyThrottlerGuard,
  RolesGuard,
  JwtAuthGuard,
} from 'src/infraestructure/guards'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'

@Controller('surveys')
export class VoteSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(201)
  @Post('vote')
  @UseGuards(JwtAuthGuard, RolesGuard, CustomSurveyThrottlerGuard)
  @AllowRoles('admin', 'user')
  @Throttle({ default: { ttl: 0, limit: 0 } })
  async run(@Body() dto: SurveyVoteHttpDto, @UserDecorator() user: User) {
    const useCase = this.surveUseCaseFactory.voteSurvey()
    await useCase.execute({ ...dto, userId: user.id })
    return {
      message: 'ok',
    }
  }
}
