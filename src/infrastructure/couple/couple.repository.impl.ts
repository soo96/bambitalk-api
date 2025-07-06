import { Injectable } from '@nestjs/common';
import { CoupleEntity } from 'src/domain/couple/couple.entity';
import { CoupleRepository } from 'src/domain/couple/couple.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';

@Injectable()
export class CoupleRepositoryImpl implements CoupleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCouple(userId: number): Promise<CoupleEntity> {
    const couple = await this.prisma.couple.create({
      data: { user1Id: userId },
    });

    return new CoupleEntity(
      Number(couple.coupleId),
      couple.inviteCode ?? '',
      Number(couple.user1Id),
      Number(couple.user2Id),
      couple.createdAt,
      couple.updatedAt
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
