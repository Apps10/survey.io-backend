import { UserPrimitive } from 'src/domain/entities'

export type JwtPayload = Omit<UserPrimitive, 'password'>
