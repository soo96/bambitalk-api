import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { CacheService } from 'src/domain/common/cache/cache.service';

@Injectable()
export class RedisService implements CacheService, OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
    const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;

    let attempts = 0;
    const MAX_ATTEMPTS = Number(process.env.REDIS_MAX_RETRIES ?? 3);
    const RETRY_DELAY = Number(process.env.REDIS_RETRY_DELAY ?? 5000);

    while (attempts < MAX_ATTEMPTS) {
      try {
        this.client = new Redis({
          host: REDIS_HOST,
          port: REDIS_PORT,
          retryStrategy: () => null,
        });

        this.client.on('connect', () => console.log('[RedisService] Redis 연결 성공'));
        await this.client.ping();
        return;
      } catch (error) {
        attempts++;
        console.error(`[RedisService] Redis 연결 실패 (시도 ${attempts}/${MAX_ATTEMPTS})`, error);
        if (attempts < MAX_ATTEMPTS) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        } else {
          console.error('[RedisService] Redis 연결 재시도 실패. 애플리케이션을 종료합니다.');
          process.exit(1);
        }
      }
    }
  }

  onModuleDestroy() {
    void this.client?.quit();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async getTTL(key: string): Promise<number> {
    return await this.client.ttl(key);
  }

  async exists(key: string): Promise<boolean> {
    return Boolean(await this.client.exists(key));
  }
}
