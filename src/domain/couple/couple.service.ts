import { Inject, Injectable } from '@nestjs/common';
import { CoupleEntity } from './couple.entity';
import { COUPLE_REPOSITORY, CoupleRepository } from './couple.repository';

@Injectable()
export class CoupleService {
  constructor(
    @Inject(COUPLE_REPOSITORY)
    private readonly coupleRepository: CoupleRepository
  ) {}

  async createCouple(userId: number): Promise<CoupleEntity> {
    return await this.coupleRepository.createCouple(userId);
  }
}
