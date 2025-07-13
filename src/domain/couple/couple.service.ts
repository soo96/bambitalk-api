import { Inject, Injectable } from '@nestjs/common';
import { CoupleEntity } from './couple.entity';
import { COUPLE_REPOSITORY, CoupleRepository } from './couple.repository';
import { DomainCustomException } from '../common/errors/domain-custom-exception';
import { DomainErrorCode } from '../common/errors/domain-error-code';

@Injectable()
export class CoupleService {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepository
  ) {}

  async createCouple(userId: number): Promise<CoupleEntity> {
    return await this.coupleRepository.createCouple(userId);
  }

  async deleteCouple(coupleId: number): Promise<void> {
    const couple = await this.coupleRepository.getCoupleById(coupleId);

    if (!couple) {
      throw new DomainCustomException(404, DomainErrorCode.COUPLE_NOT_FOUND);
    }

    await this.coupleRepository.deleteCouple(coupleId);
  }

  async updateCoupleMembers(
    coupleId: number,
    inviterUserId: number,
    userId: number
  ): Promise<void> {
    const couple = await this.coupleRepository.getCoupleById(coupleId);

    if (!couple) {
      throw new DomainCustomException(404, DomainErrorCode.COUPLE_NOT_FOUND);
    }

    if (!couple.user1Id) {
      await this.coupleRepository.updateCouple(coupleId, { user1Id: inviterUserId });
    }

    if (!couple.user2Id) {
      await this.coupleRepository.updateCouple(coupleId, { user2Id: userId });
    }
  }
}
