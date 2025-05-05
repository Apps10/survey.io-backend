import { UserPrimitive, UserRole } from 'src/domain/entities'

export interface RegisterUserDto extends UserPrimitive {
  id: string
  email: string
  password: string
  role: UserRole
}
