import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'
import { CustomSurveyThrottlerGuard } from 'src/infraestructure/guards'
import { InjectCustom } from 'src/shared/decorators'

@Controller('surveys')
export class GetAllSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(200)
  @Get()
  @UseGuards(CustomSurveyThrottlerGuard)
  @Throttle({ default: { ttl: 60, limit: 5 } })
  async run() {
    const useCase = this.surveUseCaseFactory.getAllSurveys()
    const surveys = await useCase.execute()
    return {
      surveys,
    }
  }
}
