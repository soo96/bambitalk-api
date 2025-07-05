import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { Role, UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async createUserWithToken(kakaoId: number, nickname: string, role: Role): Promise<UserEntity> {
    const user = await this.userRepository.createUser(kakaoId, nickname, role);
    await this.userRepository.createToken(user.userId);

    return user;
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.userRepository.updateToken(userId, refreshToken);
  }
}
