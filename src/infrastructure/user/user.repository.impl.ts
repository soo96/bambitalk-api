import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';

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
      Number(user.coupleId),
      Number(user.kakaoId),
      user.isDeleted ?? false,
      user.createdAt,
      user.updatedAt
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
