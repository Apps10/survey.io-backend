import { SurveyUseCaseFactory } from 'src/application/factories/SurveyUseCases.factory'
import { SURVEY_REPOSITORY, SurveyRepository } from 'src/domain/repositories'
import { InjectableCustom, InjectCustom } from 'src/shared/decorators'
import {
  CreateSurveyUseCase,
  GetAllSurveysUseCase,
  GetSurveyByIdUseCase,
} from 'src/application/useCases'

@InjectableCustom()
export class SurveyUseCaseFactoryImp implements SurveyUseCaseFactory {
  constructor(
    @InjectCustom(SURVEY_REPOSITORY)
    private readonly surveyRepo: SurveyRepository,
  ) {}

  createSurvey(): CreateSurveyUseCase {
    return new CreateSurveyUseCase(this.surveyRepo)
  }

  getAllSurveys(): GetAllSurveysUseCase {
    return new GetAllSurveysUseCase(this.surveyRepo)
  }

  getSurveyById(): GetSurveyByIdUseCase {
    return new GetSurveyByIdUseCase(this.surveyRepo)
  }
}
