import { Inject, Injectable } from '@nestjs/common';
import { SendMessageCommand } from '../message/command/send-message.command';
import { MESSAGE_REPOSITORY, MessageRepository } from './message.repository';
import { GetMessagesCommand } from './command/get-messages.command';
import { GetMessagesResult } from './result/get-messages.result';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository
  ) {}

  async saveMessage(command: SendMessageCommand) {
    return await this.messageRepository.createMessage(command);
  }

  async getMessages(command: GetMessagesCommand): Promise<GetMessagesResult[]> {
    return await this.messageRepository.getMessages(command);
  }

  async deleteMessagesByChatId(coupleId: number): Promise<void> {
    await this.messageRepository.deleteMessagesByChatId(coupleId);
  }
}
