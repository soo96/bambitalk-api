export class ScheduleEntity {
  constructor(
    public readonly scheduleId: number,
    public readonly coupleId: number,
    public readonly creatorId: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly date: Date,
    public readonly color: Color,
    public readonly isCompleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export const COLOR = {
  RED: 'RED',
  ORANGE: 'ORANGE',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
  BLUE: 'BLUE',
  PURPLE: 'PURPLE',
} as const;

export type Color = (typeof COLOR)[keyof typeof COLOR];
