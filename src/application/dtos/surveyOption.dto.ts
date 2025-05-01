export interface ISurveyOptionDto {
  id: string
  surveyId: string
  text: string
  countVotes: number
}

export type ISurveyOptionCreateDto = Omit<ISurveyOptionDto, 'countVotes'>
