import { Inject, Injectable } from '@nestjs/common';
import { SCHEDULE_REPOSITORY, ScheduleRepository } from './schedule.repository';
import { GetSchedulesCommand } from './command/get-schedules.command';
import { GetSchedulesResult } from './result/schedule-item.result';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(SCHEDULE_REPOSITORY)
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async getSchedulesByYearMonth(command: GetSchedulesCommand): Promise<GetSchedulesResult[]> {
    const schedules = await this.scheduleRepository.getSchedules(command);

    return schedules.reduce((acc, item) => {
      const group = acc.find((g) => g.date === item.date);
      if (group) {
        group.schedules.push(item);
      } else {
        acc.push({ date: item.date, schedules: [item] });
      }
      return acc;
    }, [] as GetSchedulesResult[]);
  }
}
