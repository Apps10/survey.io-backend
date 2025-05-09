import {
  ISurveyOptionPrimitive,
  ISurveyPrimivite,
  Survey,
  SurveyOption,
} from '../entities'

export interface SurveyMapper {
  SurveysToPrimitives(surveys: Survey[]): ISurveyPrimivite[]
  SurveyToPrimitive(survey: Survey): ISurveyPrimivite
  SurveyOptionsToPrimitive(
    surveyOptions: SurveyOption[],
  ): ISurveyOptionPrimitive[]
}
