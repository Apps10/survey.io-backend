import {
  SurveyOption,
  ISurveyOptionPrimitive,
  ISurveyPrimivite,
  Survey,
} from 'src/domain/entities'
import { SurveyMapper } from 'src/domain/mappers/survey.mapper'

export class SurveyMapperImp implements SurveyMapper {
  SurveyOptionsToPrimitive(
    surveyOptions: SurveyOption[],
  ): ISurveyOptionPrimitive[] {
    return surveyOptions.map((so: SurveyOption) => ({
      id: so.id,
      countVotes: so.countVotes,
      surveyId: so.surveyId,
      text: so.text,
    }))
  }

  SurveyToPrimitive(survey: Survey): ISurveyPrimivite {
    return {
      id: survey.id,
      question: survey.question,
      options: survey.options,
      isActive: survey.isActive,
      totalVotes: survey.totalVotes,
      createdAt: survey.createdAt,
    }
  }
}
