import Redis from 'ioredis'
import { ISurveyPrimivite, Survey } from 'src/domain/entities'
import { SurveyCache } from 'src/domain/interfaces/voteCache.interface'

export class SurveyCacheService implements SurveyCache {
  private readonly DEFAULT_TTL_IN_SECONDS = 60 * 60
  private readonly prefix = 'cache:survey'

  constructor(private readonly redis: Redis) {}

  async set(surveyId: string, survey: ISurveyPrimivite): Promise<void> {
    await this.redis.set(
      this.getFullPrefix(surveyId),
      JSON.stringify(survey),
      'EX',
      this.DEFAULT_TTL_IN_SECONDS,
    )
  }

  async get(surveyId: string): Promise<ISurveyPrimivite | null> {
    const raw = await this.redis.get(this.getFullPrefix(surveyId))
    return raw ? Survey.fromPrimitives(JSON.parse(raw)) : null
  }

  async getAll(): Promise<ISurveyPrimivite[]> {
    let cursor = '0'
    const keys: string[] = []

    do {
      const [nextCursor, found] = await this.redis.scan(
        cursor,
        'MATCH',
        `${this.prefix}:*`,
        'COUNT',
        10,
      )
      cursor = nextCursor
      keys.push(...found)
    } while (cursor !== '0')

    const surveys = await Promise.all(
      keys.map(async (key) => {
        const raw = await this.redis.get(key)
        return raw ? Survey.fromPrimitives(JSON.parse(raw)) : null
      }),
    )

    return surveys as ISurveyPrimivite[]
  }

  async setMany(surveys: ISurveyPrimivite[]): Promise<void> {
    const pipeline = this.redis.pipeline()
    surveys.forEach((s) =>
      pipeline.set(
        this.getFullPrefix(s.id),
        JSON.stringify(s),
        'EX',
        this.DEFAULT_TTL_IN_SECONDS,
      ),
    )
    await pipeline.exec()
  }

  private getFullPrefix(surveyId: string) {
    return `${this.prefix}:${surveyId}`
  }
}
