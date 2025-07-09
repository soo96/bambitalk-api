import { Injectable } from '@nestjs/common';
import { GetSchedulesCommand } from 'src/domain/schedule/command/get-schedules.command';
import { ScheduleItem } from 'src/domain/schedule/result/schedule-item.result';
import { ScheduleRepository } from 'src/domain/schedule/schedule.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { endOfMonth, startOfMonth, format } from 'date-fns';

@Injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getSchedules({ coupleId, yearMonth }: GetSchedulesCommand): Promise<ScheduleItem[]> {
    const startDate = startOfMonth(new Date(`${yearMonth}-01`));
    const endDate = endOfMonth(startDate);

    const schedules = await this.prisma.schedule.findMany({
      where: {
        coupleId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
      include: {
        creator: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
    });

    return schedules.map(
      (s): ScheduleItem => ({
        scheduleId: Number(s.scheduleId),
        title: s.title,
        description: s.description ?? undefined,
        date: format(s.date, 'yyyy-MM-dd'),
        time: format(s.date, 'HH:mm'),
        isCompleted: s.isCompleted,
        creatorId: Number(s.creatorId),
        creatorRole: s.creator.role,
      })
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
