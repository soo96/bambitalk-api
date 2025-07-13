import { CreateScheduleCommand } from './command/create-schedule.command';
import { GetSchedulesCommand } from './command/get-schedules.command';
import { UpdateScheduleCommand } from './command/update-schedule.command';
import { ScheduleItem } from './result/schedule-item.result';
import { ScheduleEntity } from './schedule.entity';

export const SCHEDULE_REPOSITORY = Symbol('SCHEDULE_REPOSITORY');

export interface ScheduleRepository {
  getSchedule(scheduleId: number): Promise<ScheduleEntity | null>;
  getSchedules(command: GetSchedulesCommand): Promise<ScheduleItem[]>;
  createSchedule(command: CreateScheduleCommand): Promise<ScheduleEntity>;
  updateSchedule(scheduleId: number, command: UpdateScheduleCommand): Promise<ScheduleEntity>;
  deleteSchedule(scheduleId: number): Promise<void>;
  deleteScheduleByCoupleId(coupleId: number): Promise<void>;
}
