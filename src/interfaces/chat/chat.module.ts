import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from 'src/domain/chat/chat.service';
import { ChatController } from './chat.controller';
import { ChatUseCase } from 'src/application/chat/chat.use-case';
import { CHAT_REPOSITORY } from 'src/domain/chat/chat.repository';
import { ChatRepositoryImpl } from 'src/infrastructure/chat/chat.repository.impl';

@Module({
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatUseCase,
    ChatService,
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatRepositoryImpl,
    },
  ],
})
export class ChatModule {}
