import { Role } from 'src/domain/user/user.entity';

export interface SignupCommand {
  kakaoId: number;
  nickname: string;
  role: Role;
}
