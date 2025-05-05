import {
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator'
import { UserRole, UserRoleEnum } from 'src/domain/entities'

export class UserRegisterHttpDto {
  @IsString()
  @IsUUID()
  id: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string

  @IsString()
  @IsEnum(UserRoleEnum)
  role: UserRole
}
