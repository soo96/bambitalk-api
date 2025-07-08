import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageUseCase } from 'src/application/message/message.use-case';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { User } from '../common/decorators/user.decorator';
import { JwtPayload } from 'src/support/jwt.util';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageUseCase: MessageUseCase) {}

  @Get()
  async getMessages(
    @User() { coupleId }: JwtPayload,
    @Query() getMessagesDto: GetMessagesQueryDto
  ) {
    if (coupleId === null) {
      throw new DomainCustomException(401, DomainErrorCode.UNAUTHORIZED);
    }

    const messages = await this.messageUseCase.getMessages(getMessagesDto.toCommand(coupleId));

    return ResultResponseDto.success({ messages });
  }
}
