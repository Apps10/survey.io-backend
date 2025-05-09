import { SurveyUseCaseFactory } from 'src/application/factories/SurveyUseCases.factory'
import { SURVEY_REPOSITORY, SurveyRepository } from 'src/domain/repositories'
import { InjectableCustom, InjectCustom } from 'src/shared/decorators'
import {
  CreateSurveyUseCase,
  GetAllSurveysUseCase,
  GetSurveyByIdUseCase,
  VoteSurveyUseCase,
} from 'src/application/useCases'
import {
  SURVEY_NOTIFIER_SERVICE,
  SurveyNotifierService,
} from 'src/domain/services'
import { SurveyMapperImp } from '../mappers'

@InjectableCustom()
export class SurveyUseCaseFactoryImp implements SurveyUseCaseFactory {
  constructor(
    @InjectCustom(SURVEY_REPOSITORY)
    private readonly surveyRepo: SurveyRepository,

    @InjectCustom(SURVEY_NOTIFIER_SERVICE)
    private readonly surveyNotify: SurveyNotifierService,
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

  voteSurvey(): VoteSurveyUseCase {
    return new VoteSurveyUseCase(
      this.surveyRepo,
      this.surveyNotify,
      new SurveyMapperImp(),
    )
  }
}
