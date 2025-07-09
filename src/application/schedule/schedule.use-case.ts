import { Injectable } from '@nestjs/common';
import { GetSchedulesCommand } from 'src/domain/schedule/command/get-schedules.command';
import { GetSchedulesResult } from 'src/domain/schedule/result/schedule-item.result';
import { ScheduleService } from 'src/domain/schedule/schedule.service';

@Injectable()
export class ScheduleUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async getSchedulesByYearMonth(command: GetSchedulesCommand): Promise<GetSchedulesResult[]> {
    return await this.scheduleService.getSchedulesByYearMonth(command);
  }
}
