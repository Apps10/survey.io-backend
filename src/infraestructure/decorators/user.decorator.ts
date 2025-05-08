import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/domain/entities'

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user as User

    if (!user) {
      throw new Error('missing user in request, forgot call jwtAuthGuard?')
    }

    return user
  },
)
