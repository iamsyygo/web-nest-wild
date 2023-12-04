import { Inject, Injectable } from '@nestjs/common';
import { CreateRediDto } from './dto/create-redi.dto';
import { UpdateRediDto } from './dto/update-redi.dto';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async set(key: string, value: string) {
    return await this.redisClient.set(key, value);
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async del(key: string) {
    return await this.redisClient.del(key);
  }

  /**
   * 设置过期时间
   * @param key
   * @param value
   * @param seconds 过期时间，单位秒
   * @returns
   */
  async setex(key: string, value: string, seconds: number) {
    return await this.redisClient.setEx(key, seconds, value);
  }
}
