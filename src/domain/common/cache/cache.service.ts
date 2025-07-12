export const CACHE_SERVICE = Symbol('CacheService');

export interface CacheService {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  getTTL(key: string): Promise<number>;
  exists(key: string): Promise<boolean>;
}
