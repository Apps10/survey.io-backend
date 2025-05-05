import { IsString, IsUUID } from 'class-validator'

export class SurveyOptionCreateHttpDto {
  @IsString()
  @IsUUID()
  id: string

  @IsString()
  text: string
}
