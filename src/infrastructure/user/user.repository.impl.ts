import { Injectable } from '@nestjs/common';
import { Role, UserEntity } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { TokenEntity } from 'src/domain/user/token.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserByKakaoId(kakaoId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { kakaoId },
    });

    if (!user) {
      return null;
    }

    return new UserEntity(
      Number(user.userId),
      user.nickname ?? '',
      user.role ?? 'DAD',
      user.coupleId !== null ? Number(user.coupleId) : null,
      Number(user.kakaoId),
      user.isDeleted ?? false,
      user.createdAt,
      user.updatedAt
    );
  }

  async createUser(kakaoId: number, nickname: string, role: Role): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: { nickname, role, kakaoId },
    });

    return new UserEntity(
      Number(user.userId),
      user.nickname ?? '',
      user.role ?? 'DAD',
      user.coupleId !== null ? Number(user.coupleId) : null,
      Number(user.kakaoId),
      user.isDeleted ?? false,
      user.createdAt,
      user.updatedAt
    );
  }

  async createToken(userId: number): Promise<TokenEntity> {
    const token = await this.prisma.token.create({
      data: { userId },
    });

    return new TokenEntity(
      Number(token.tokenId),
      Number(token.userId),
      token.refreshToken ?? '',
      token.createdAt,
      token.updatedAt
    );
  }

  async updateCoupleId(userId: number, coupleId: number): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: { coupleId },
    });
  }

  async updateToken(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.token.update({
      where: { userId },
      data: { refreshToken },
    });
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
