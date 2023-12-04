import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';
import { YAML_DATA } from '@/config/js-yaml';

const redisConfig = YAML_DATA;

@Global()
@Module({
  exports: [RedisService],
  // controllers: [RedisController],
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: redisConfig.redis.host,
            port: redisConfig.redis.port,
          },
        });
        await client.connect().catch((err) => {
          console.error('🛢️ redis 连接失败', err);
        });
        return client;
      },
    },
  ],
})
export class RedisModule {}
