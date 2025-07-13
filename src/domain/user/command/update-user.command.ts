import { Role } from '../user.entity';

export interface UpdateUserCommand {
  nickname?: string;
  coupleId?: number;
  spouseId?: number;
  role?: Role;
  isDeleted?: boolean;
}
