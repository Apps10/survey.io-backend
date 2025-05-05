import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { SurveyCreateHttpDto } from '../http-dtos/surveyCreate.http-dto'
import {
  SURVEY_USE_CASE_FACTORY,
  SurveyUseCaseFactory,
} from 'src/application/factories/SurveyUseCases.factory'
import { InjectCustom } from 'src/shared/decorators'

@Controller('surveys')
export class CreateSurveyController {
  constructor(
    @InjectCustom(SURVEY_USE_CASE_FACTORY)
    private readonly surveUseCaseFactory: SurveyUseCaseFactory,
  ) {}

  @HttpCode(201)
  @Post()
  async run(@Body() dto: SurveyCreateHttpDto) {
    const useCase = this.surveUseCaseFactory.createSurvey()
    await useCase.execute({
      ...dto,
    })
    return {
      message: 'Survey created successfully',
    }
  }
}
