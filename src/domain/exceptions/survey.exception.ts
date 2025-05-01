import { customExceptionMaker } from 'src/shared/exceptions/exceptionMaker'

export const SurveysNotExistException = customExceptionMaker(
  'SurveysNotExistException',
  'there arent avaliable surveys',
)

export const SurveyNotFoundException = customExceptionMaker(
  'SurveyNotFoundException',
  'survey not found',
)

export const SurveyOptionNotFoundException = customExceptionMaker(
  'SurveyOptionNotFoundException',
  'survey option not found',
)
