import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ScheduleUseCase } from 'src/application/schedule/schedule.use-case';
import { GetSchedulesDto } from './dto/get-schedules.dto';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtPayload } from 'src/support/jwt.util';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';

@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleUseCase: ScheduleUseCase) {}

  @Get()
  async getSchedulesByYearMon(@User() user: JwtPayload, @Query() dto: GetSchedulesDto) {
    const { coupleId } = user;
    const { yearMonth } = dto;

    if (coupleId === null) {
      throw new DomainCustomException(401, DomainErrorCode.UNAUTHORIZED);
    }

    const result = await this.scheduleUseCase.getSchedulesByYearMonth({ coupleId, yearMonth });

    return ResultResponseDto.success(result);
  }
}
