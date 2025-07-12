import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from 'src/support/jwt.util';
import { CoupleUseCase } from 'src/application/couple/couple.use-case';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('couples')
export class CoupleController {
  constructor(private readonly coupleUseCase: CoupleUseCase) {}

  @Post('invite-code')
  async issueInviteCode(@User() user: JwtPayload) {
    const { userId } = user;

    const result = await this.coupleUseCase.issueInviteCode(userId);

    return ResultResponseDto.success(result);
  }
}
