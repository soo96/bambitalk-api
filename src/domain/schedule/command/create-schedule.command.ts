import { Color } from '../schedule.entity';

export interface CreateScheduleCommand {
  coupleId: number;
  creatorId: number;
  title: string;
  description?: string;
  date: Date;
  color: Color;
  isCompleted?: boolean;
}
