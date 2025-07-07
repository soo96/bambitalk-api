import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY, ChatRepository } from './chat.repository';
import { SendMessageCommand } from './command/sendMessageDto';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository
  ) {}
  async saveMessage(command: SendMessageCommand) {
    return await this.chatRepository.createMessage(command);
  }
}
