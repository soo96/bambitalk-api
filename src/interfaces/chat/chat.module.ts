import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from 'src/domain/chat/chat.service';
import { ChatController } from './chat.controller';
import { ChatUseCase } from 'src/application/chat/chat.use-case';
import { CHAT_REPOSITORY } from 'src/domain/chat/chat.repository';
import { ChatRepositoryImpl } from 'src/infrastructure/chat/chat.repository.impl';
import { JwtService } from '@nestjs/jwt';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatUseCase,
    ChatService,
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatRepositoryImpl,
    },
    JwtService,
  ],
  exports: [ChatService],
})
export class ChatModule {}
