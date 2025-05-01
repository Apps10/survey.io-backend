import { ISurveyOptionDto, ISurveyOptionCreateDto } from './surveyOption.dto'

export interface ISurvey {
  id: string
  question: string
  totalVotes: number
  isActive: boolean
  options: ISurveyOptionDto[]
  CreatedAt: Date
}

export type ISurveyEditDto = Omit<ISurveyCreateDto, 'id'>
export interface ISurveyCreateDto
  extends Omit<ISurvey, 'CreatedAt' | 'options' | 'totalVotes'> {
  options: ISurveyOptionCreateDto[]
}

export interface ISurveyVote {
  surveyId: string
  userId: string
}
