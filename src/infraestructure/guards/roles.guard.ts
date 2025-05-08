import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from 'src/domain/entities'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    )
    if (!requiredRoles) return true

    const user = context.switchToHttp().getRequest().user as User
    if (!user) {
      throw new Error('missing user in request, forgot call jwtAuthGuard?')
    }

    return requiredRoles.includes(user.role)
  }
}
