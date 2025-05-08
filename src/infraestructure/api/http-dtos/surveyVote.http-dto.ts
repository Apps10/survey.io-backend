import { IsString, IsUUID } from 'class-validator'

export class SurveyVoteHttpDto {
  @IsString()
  @IsUUID()
  optionId: string

  @IsString()
  @IsUUID()
  surveyId: string
}
