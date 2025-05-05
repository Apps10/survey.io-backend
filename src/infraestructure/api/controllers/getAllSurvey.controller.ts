import { Controller, Get, HttpCode } from '@nestjs/common'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'
import { InjectCustom } from 'src/shared/decorators'

@Controller('surveys')
export class GetAllSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(201)
  @Get()
  async run() {
    const useCase = this.surveUseCaseFactory.getAllSurveys()
    const surveys = await useCase.execute()
    return {
      surveys,
    }
  }
}
