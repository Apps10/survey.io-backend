import {
  ISurveyOptionPrimitive,
  ISurveyPrimivite,
  Survey,
  SurveyOption,
} from '../entities'

export interface SurveyMapper {
  SurveyToPrimitive(survey: Survey): ISurveyPrimivite
  SurveyOptionsToPrimitive(
    surveyOptions: SurveyOption[],
  ): ISurveyOptionPrimitive[]
}
