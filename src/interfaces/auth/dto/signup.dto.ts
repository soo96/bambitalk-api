import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { SignupCommand } from 'src/domain/auth/command/signup.command';
import { Role } from 'src/domain/user/user.entity';

export class SignupDto {
  @Length(2, 10)
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsIn(Object.values(Role))
  @IsNotEmpty()
  role: Role;

  toCommand(): SignupCommand {
    return {
      nickname: this.nickname,
      role: this.role,
    };
  }
}
