import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'
import { InjectCustom } from 'src/shared/decorators'
import { SurveyVoteHttpDto } from '../http-dtos/surveyVote.http-dto'

@Controller('surveys')
export class VoteSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(201)
  @Post('vote')
  async run(@Body() dto: SurveyVoteHttpDto) {
    const useCase = this.surveUseCaseFactory.voteSurvey()
    await useCase.execute(dto)
    return {
      message: 'ok',
    }
  }
}
