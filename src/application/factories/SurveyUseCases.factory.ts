import {
  CreateSurveyUseCase,
  GetAllSurveysUseCase,
  GetSurveyByIdUseCase,
  VoteSurveyUseCase,
} from '../useCases'

export const SURVEY_USE_CASE_FACTORY = Symbol('SurveyUseCaseFactory')
export interface SurveyUseCaseFactory {
  createSurvey(): CreateSurveyUseCase
  getAllSurveys(): GetAllSurveysUseCase
  getSurveyById(): GetSurveyByIdUseCase
  voteSurvey(): VoteSurveyUseCase
}
