import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleUseCase } from 'src/application/schedule/schedule.use-case';
import { ScheduleService } from 'src/domain/schedule/schedule.service';
import { SCHEDULE_REPOSITORY } from 'src/domain/schedule/schedule.repository';
import { ScheduleRepositoryImpl } from 'src/infrastructure/schedule/schedule.repository.impl';

@Module({
  controllers: [ScheduleController],
  providers: [
    ScheduleUseCase,
    ScheduleService,
    {
      provide: SCHEDULE_REPOSITORY,
      useClass: ScheduleRepositoryImpl,
    },
  ],
})
export class ScheduleModule {}
