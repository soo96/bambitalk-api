import { Module } from '@nestjs/common';
import { CoupleUseCase } from 'src/application/couple/couple.use-case';
import { COUPLE_REPOSITORY } from 'src/domain/couple/couple.repository';
import { CoupleService } from 'src/domain/couple/couple.service';
import { CoupleRepositoryImpl } from 'src/infrastructure/couple/couple.repository.impl';
import { UserModule } from '../user/user.module';
import { CoupleController } from './couple.controller';
import { ChatModule } from '../chat/chat.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UserModule, ChatModule, ScheduleModule, MessageModule],
  controllers: [CoupleController],
  providers: [
    CoupleUseCase,
    CoupleService,
    {
      provide: COUPLE_REPOSITORY,
      useClass: CoupleRepositoryImpl,
    },
  ],
  exports: [CoupleService, COUPLE_REPOSITORY],
})
export class CoupleModule {}
