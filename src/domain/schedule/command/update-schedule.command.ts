import { COLOR } from '../schedule.entity';

export interface UpdateScheduleCommand {
  title?: string;
  description?: string;
  date?: Date;
  color?: COLOR;
  isCompleted?: boolean;
}
