import { TokenEntity } from './token.entity';
import { Role, UserEntity } from './user.entity';

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
  getUserByKakaoId(kakaoId: number): Promise<UserEntity | null>;
  createUser(kakaoId: number, nickname: string, role: Role): Promise<UserEntity>;
  createToken(userId: number): Promise<TokenEntity>;
  updateCoupleId(userId: number, coupleId: number): Promise<void>;
  updateToken(userId: number, refreshToken: string): Promise<void>;
}
