import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from 'src/support/jwt.util';
import { CoupleUseCase } from 'src/application/couple/couple.use-case';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CoupleMergeDto } from './dto/couple-merge.dto';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('couples')
export class CoupleController {
  constructor(private readonly coupleUseCase: CoupleUseCase) {}

  @Post('invite-code')
  async issueInviteCode(@User() user: JwtPayload) {
    const result = await this.coupleUseCase.issueInviteCode(user.userId);

    return ResultResponseDto.success(result);
  }

  @Post('join')
  async mergeByInviteCode(
    @User() user: JwtPayload,
    @Body() coupleJoinDto: CoupleMergeDto,
    @Res() response: Response
  ) {
    await this.coupleUseCase.mergeByInviteCode(user.userId, coupleJoinDto.inviteCode);

    response.status(200).json(ResultResponseDto.success());
  }
}
