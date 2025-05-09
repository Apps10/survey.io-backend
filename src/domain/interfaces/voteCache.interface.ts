import { ISurveyPrimivite } from '../entities'

export const SURVEY_CACHE = Symbol('SurveyCache')
export interface SurveyCache {
  getAll(): Promise<ISurveyPrimivite[] | []>
  get(surveyId: string): Promise<ISurveyPrimivite | null>
  set(surveyId: string, survey: ISurveyPrimivite): Promise<void>
  setMany(surveys: ISurveyPrimivite[]): Promise<void>
}
