import { CoupleEntity } from './couple.entity';

export const COUPLE_REPOSITORY = Symbol('COUPLE_REPOSITORY');

export interface CoupleRepository {
  createCouple(userId: number): Promise<CoupleEntity>;
}
