import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/domain/chat/chat.service';
import { SendMessageCommand } from 'src/domain/chat/command/sendMessageDto';

@Injectable()
export class ChatUseCase {
  constructor(private readonly chatService: ChatService) {}

  async saveMessage(payload: SendMessageCommand) {
    return await this.chatService.saveMessage(payload);
  }
}
