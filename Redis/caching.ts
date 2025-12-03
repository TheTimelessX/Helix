import { redis } from './redis';

interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
}

export class Cache {
  static async get<T>(key: string): Promise<T | null> {
    const raw = await redis.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  static async set<T>(
    key: string,
    value: T,
    options: CacheOptions = {}
  ): Promise<void> {
    const { keyPrefix = 'cache:' } = options;
    const finalKey = `${keyPrefix}${key}`;

    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    if (options.ttl){
        if (options.ttl > 0){
            await redis.set(finalKey, serialized, 'EX', options.ttl);
        } else {
            await redis.set(finalKey, serialized);
        }
    } else {
      await redis.set(finalKey, serialized);
    }
  }

  static async del(key: string): Promise<void> {
    await redis.del(key);
  }

  static async delByPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }
}
