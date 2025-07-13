import { Injectable } from '@nestjs/common';
import { CoupleEntity } from 'src/domain/couple/couple.entity';
import { CoupleRepository } from 'src/domain/couple/couple.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { UpdateCoupleCommand } from 'src/domain/couple/command/update-couple.command';

@Injectable()
export class CoupleRepositoryImpl implements CoupleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCoupleById(coupleId: number): Promise<CoupleEntity | null> {
    const couple = await this.prisma.couple.findUnique({
      where: { coupleId },
    });

    if (!couple) {
      return null;
    }

    return new CoupleEntity(
      Number(couple.coupleId),
      Number(couple.user1Id),
      Number(couple.user2Id),
      couple.createdAt,
      couple.updatedAt
    );
  }

  async createCouple(userId: number): Promise<CoupleEntity> {
    const couple = await this.prisma.couple.create({
      data: { user1Id: userId },
    });

    return new CoupleEntity(
      Number(couple.coupleId),
      Number(couple.user1Id),
      Number(couple.user2Id),
      couple.createdAt,
      couple.updatedAt
    );
  }

  async updateCouple(coupleId: number, command: UpdateCoupleCommand): Promise<void> {
    await this.prisma.couple.update({
      where: { coupleId },
      data: command,
    });
  }

  async deleteCouple(coupleId: number): Promise<void> {
    await this.prisma.couple.delete({
      where: { coupleId },
    });
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
