export class ScheduleEntity {
  constructor(
    public readonly scheduleId: number,
    public readonly coupleId: number,
    public readonly creatorId: number,
    public readonly title: string,
    public readonly description: string | null,
    public readonly date: Date,
    public readonly isCompleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
