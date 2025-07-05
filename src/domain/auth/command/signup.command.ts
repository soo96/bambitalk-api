import { Role } from 'src/domain/user/user.entity';

export interface SignupCommand {
  nickname: string;
  role: Role;
}
