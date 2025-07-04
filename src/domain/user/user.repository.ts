import { UserEntity } from './user.entity';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
  getUserByKakaoId(kakaoId: number): Promise<UserEntity | null>;
}
