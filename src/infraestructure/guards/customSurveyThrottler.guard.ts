import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerRequest,
  ThrottlerStorage,
} from '@nestjs/throttler'
import { User, UserRole } from 'src/domain/entities'

type RateLimitCustom = { ttlInSeconds: number; rateLimit: number }
type RateLimitCustomObjects = Record<UserRole | 'guest', RateLimitCustom>
interface CustomRequest {
  params?: { surveyId?: string }
  body?: { surveyId?: string }
  query?: { surveyId?: string }
  user?: User
  ip?: string
}

@Injectable()
export class CustomSurveyThrottlerGuard extends ThrottlerGuard {
  private readonly prefix = 'rate-limit:survey'
  private readonly MAX_RATE_LIMIT_BY_ROLE: RateLimitCustomObjects = {
    user: {
      ttlInSeconds: 60,
      rateLimit: 2,
    },
    admin: {
      ttlInSeconds: 60,
      rateLimit: 10,
    },
    guest: {
      ttlInSeconds: 60 * 60, //1 hora
      rateLimit: 2,
    },
  }

  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector)
  }

  protected handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    return super.handleRequest({
      ...requestProps,
      limit: this.getLimit(requestProps.context),
      ttl: this.getTTL(requestProps.context),
    })
  }

  protected getTracker(req: Record<string, any>): Promise<string> {
    const surveyId = this.getSurveyId(req)
    const tracker = this.getCustomTracker(req, surveyId)
    return Promise.resolve(tracker)
  }

  private getCustomLimit(context: ExecutionContext): RateLimitCustom {
    const request: CustomRequest = context.switchToHttp().getRequest()
    const user = request.user as User

    return (
      this.MAX_RATE_LIMIT_BY_ROLE[user?.role] ??
      this.MAX_RATE_LIMIT_BY_ROLE.guest
    )
  }

  protected getLimit(context: ExecutionContext): number {
    return this.getCustomLimit(context).rateLimit
  }

  protected getTTL(context: ExecutionContext): number {
    return this.getCustomLimit(context).ttlInSeconds
  }

  private getSurveyId(req: CustomRequest) {
    return (
      req.params?.surveyId ||
      req.body?.surveyId ||
      req.query?.surveyId ||
      'global'
    )
  }

  private getCustomTracker(req: CustomRequest, surveyId: string) {
    let tracker = ''

    if (req.user?.id) {
      tracker = `${this.prefix}:${surveyId}:user:${req.user?.id}`
    } else if (req.ip) {
      tracker = `${this.prefix}:${surveyId}:ip:${req.ip}`
    } else {
      tracker = `${this.prefix}:${surveyId}:unknow`
    }
    return tracker
  }
}
