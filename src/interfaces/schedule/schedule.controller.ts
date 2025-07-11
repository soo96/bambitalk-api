import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleUseCase } from 'src/application/schedule/schedule.use-case';
import { GetSchedulesDto } from './dto/get-schedules.dto';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtPayload } from 'src/support/jwt.util';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/patch-schedule.dto';
import { RequestErrorCode } from '../common/errors/request-error-code';
import { ParseIntWithCodePipe } from '../common/pipes/parse-int.pipe';

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

  @Post()
  async postSchedule(@User() user: JwtPayload, @Body() createScheduleDto: CreateScheduleDto) {
    const { coupleId, userId } = user;

    if (coupleId === null) {
      throw new DomainCustomException(401, DomainErrorCode.UNAUTHORIZED);
    }

    const command = createScheduleDto.toCommand(coupleId, userId);

    const result = await this.scheduleUseCase.createSchedule(command);

    return ResultResponseDto.success(result);
  }

  @Patch(':id')
  async patchSchedule(
    @Param('id', new ParseIntWithCodePipe(RequestErrorCode.INVALID_SCHEDULE_ID_TYPE))
    scheduleId: number,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    const command = updateScheduleDto.toCommand();

    const result = await this.scheduleUseCase.updateSchedule(scheduleId, command);

    return ResultResponseDto.success(result);
  }

  @Delete(':id')
  async deleteSchedule(
    @Param('id', new ParseIntWithCodePipe(RequestErrorCode.INVALID_SCHEDULE_ID_TYPE))
    scheduleId: number
  ) {
    await this.scheduleUseCase.deleteSchedule(scheduleId);

    return ResultResponseDto.success();
  }
}
