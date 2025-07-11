import { Injectable } from '@nestjs/common';
import { GetSchedulesCommand } from 'src/domain/schedule/command/get-schedules.command';
import { ScheduleItem } from 'src/domain/schedule/result/schedule-item.result';
import { ScheduleRepository } from 'src/domain/schedule/schedule.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { endOfMonth, startOfMonth, format } from 'date-fns';
import { CreateScheduleCommand } from 'src/domain/schedule/command/create-schedule.command';
import { ScheduleEntity } from 'src/domain/schedule/schedule.entity';

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
        color: s.color,
        isCompleted: s.isCompleted,
        creatorId: Number(s.creatorId),
        creatorRole: s.creator.role,
      })
    );
  }

  async createSchedule(command: CreateScheduleCommand): Promise<ScheduleEntity> {
    const newSchedule = await this.prisma.schedule.create({
      data: command,
    });

    return new ScheduleEntity(
      Number(newSchedule.scheduleId),
      Number(newSchedule.coupleId),
      Number(newSchedule.creatorId),
      newSchedule.title,
      newSchedule.description,
      newSchedule.date,
      newSchedule.color,
      newSchedule.isCompleted,
      newSchedule.createdAt,
      newSchedule.updatedAt
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
