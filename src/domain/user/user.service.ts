import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { Role, UserEntity } from './user.entity';
import { DomainCustomException } from '../common/errors/domain-custom-exception';
import { DomainErrorCode } from '../common/errors/domain-error-code';

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

  async validateUserExists(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new DomainCustomException(404, DomainErrorCode.USER_NOT_FOUND);
    }

    return user;
  }

  async updateUserForMerge(userId: number, coupleId: number, spouseId: number) {
    await this.userRepository.updateUser(userId, {
      coupleId,
      spouseId,
    });
  }
}
