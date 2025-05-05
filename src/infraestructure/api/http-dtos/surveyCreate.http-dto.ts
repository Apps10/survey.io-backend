import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { SurveyOptionCreateHttpDto } from './SurveyOptionCreate.http-dto'

export class SurveyCreateHttpDto {
  @IsString()
  @IsUUID()
  id: string

  @IsArray({})
  @Type(() => SurveyOptionCreateHttpDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  options: SurveyOptionCreateHttpDto[]

  @IsBoolean()
  isActive: boolean

  @IsString()
  @Length(5, 50)
  question: string
}
