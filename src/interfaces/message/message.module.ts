import { forwardRef, Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from 'src/domain/message/message.service';
import { MESSAGE_REPOSITORY } from 'src/domain/message/message.repository';
import { MessageRepositoryImpl } from 'src/infrastructure/message/message.repository.impl';
import { MessageUseCase } from 'src/application/message/message.use-case';
import { ChatModule } from '../chat/chat.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [forwardRef(() => ChatModule), FileModule],
  controllers: [MessageController],
  providers: [
    MessageUseCase,
    MessageService,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessageRepositoryImpl,
    },
  ],
  exports: [MessageUseCase, MessageService, MESSAGE_REPOSITORY],
})
export class MessageModule {}
