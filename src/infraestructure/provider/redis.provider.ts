import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from 'src/shared/config'

export class RedisProvider {
  private static redisConnection: Redis
  private constructor() {}

  static getConnection() {
    if (!this.redisConnection) {
      this.redisConnection = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
      })
    }
    return this.redisConnection
  }
}
