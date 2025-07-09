export interface ScheduleItem {
  scheduleId: number;
  title: string;
  description?: string | null;
  date: string;
  time: string;
  isCompleted: boolean;
  creatorId: number;
  creatorRole: 'DAD' | 'MOM' | null;
}

export interface GetSchedulesResult {
  date: string;
  schedules: ScheduleItem[];
}
