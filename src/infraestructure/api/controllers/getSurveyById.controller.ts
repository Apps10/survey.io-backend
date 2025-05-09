import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from '@nestjs/common'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories'
import { InjectCustom } from 'src/shared/decorators'

@Controller('surveys')
export class GetSurveyByIdController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(200)
  @Get('/:id')
  async run(@Param('id', ParseUUIDPipe) id: string) {
    const useCase = this.surveUseCaseFactory.getSurveyById()
    const surveys = await useCase.execute(id)
    return {
      surveys,
    }
  }
}
