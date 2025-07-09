import { GetSchedulesCommand } from './command/get-schedules.command';
import { ScheduleItem } from './result/schedule-item.result';

export const SCHEDULE_REPOSITORY = Symbol('SCHEDULE_REPOSITORY');

export interface ScheduleRepository {
  getSchedules(command: GetSchedulesCommand): Promise<ScheduleItem[]>;
}
