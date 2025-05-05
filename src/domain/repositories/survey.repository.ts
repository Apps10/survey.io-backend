import { Survey } from '../entities/survey'
import { GenericRepository } from './generic.repository'

export const SURVEY_REPOSITORY = Symbol('SurveyRepository')
export interface SurveyRepository extends GenericRepository<Survey> {
  saveUserVote(userId: string, optionId: string): Promise<void>
  deactivateSurvey(surveyId: string): Promise<void>
}
