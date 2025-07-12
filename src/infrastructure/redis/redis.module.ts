import { Global, Module } from '@nestjs/common';
import { CACHE_SERVICE } from 'src/domain/common/cache/cache.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: CACHE_SERVICE,
      useClass: RedisService,
    },
  ],
  exports: [CACHE_SERVICE],
})
export class RedisModule {}
