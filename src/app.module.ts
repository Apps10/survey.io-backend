import { Module } from '@nestjs/common'
import { CommonModule } from './infraestructure/common.module'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis'
import { RedisProvider } from './infraestructure/provider/redis.provider'

@Module({
  imports: [
    CommonModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 0,
          limit: 0,
        },
      ],
      storage: new ThrottlerStorageRedisService(RedisProvider.getConnection()),
    }),
  ],
})
export class AppModule {}
