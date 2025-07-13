import { UpdateCoupleCommand } from './command/update-couple.command';
import { CoupleEntity } from './couple.entity';

export const COUPLE_REPOSITORY = Symbol('COUPLE_REPOSITORY');

export interface CoupleRepository {
  getCoupleById(coupleId: number): Promise<CoupleEntity | null>;
  createCouple(userId: number): Promise<CoupleEntity>;
  updateCouple(coupleId: number, command: UpdateCoupleCommand): Promise<void>;
  deleteCouple(coupleId: number): Promise<void>;
}
