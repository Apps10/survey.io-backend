import { ISurveyOptionPrimitive, ISurveyPrimivite } from '../entities'

export const SURVEY_NOTIFIER_SERVICE = Symbol('SurveyNotifierService')

export interface SurveyNotifierService {
  NotifyVote(surveyId: string, surveyOptions: ISurveyOptionPrimitive[]): void
  NotifyNewSurvey(Survey: ISurveyPrimivite): void
}
