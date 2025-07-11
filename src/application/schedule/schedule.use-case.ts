import { Injectable } from '@nestjs/common';
import { CreateScheduleCommand } from 'src/domain/schedule/command/create-schedule.command';
import { GetSchedulesCommand } from 'src/domain/schedule/command/get-schedules.command';
import { UpdateScheduleCommand } from 'src/domain/schedule/command/update-schedule.command';
import { GetSchedulesResult } from 'src/domain/schedule/result/schedule-item.result';
import { ScheduleEntity } from 'src/domain/schedule/schedule.entity';
import { ScheduleService } from 'src/domain/schedule/schedule.service';

@Injectable()
export class ScheduleUseCase {
  constructor(private readonly scheduleService: ScheduleService) {}

  async getSchedulesByYearMonth(command: GetSchedulesCommand): Promise<GetSchedulesResult[]> {
    return await this.scheduleService.getSchedulesByYearMonth(command);
  }

  async createSchedule(command: CreateScheduleCommand): Promise<ScheduleEntity> {
    return await this.scheduleService.createSchedule(command);
  }

  async updateSchedule(
    scheduleId: number,
    command: UpdateScheduleCommand
  ): Promise<ScheduleEntity> {
    return await this.scheduleService.updateSchedule(scheduleId, command);
  }
}
