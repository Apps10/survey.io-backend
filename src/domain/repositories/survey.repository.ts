import { Survey } from '../entities/survey'
import { GenericRepository } from './generic.repository'

export interface SurveyRepository extends GenericRepository<Survey> {
  vote(surveyId: string, optionId: string): Promise<void>
  deactivateSurvey(surveyId: string): Promise<void>
}
