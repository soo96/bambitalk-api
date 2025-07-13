import { GetMessagesCommand } from './command/get-messages.command';
import { SendMessageCommand } from './command/send-message.command';
import { MessageEntity } from './message.entity';
import { GetMessagesResult } from './result/get-messages.result';

export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');

export interface MessageRepository {
  createMessage(command: SendMessageCommand): Promise<MessageEntity>;
  getMessages(command: GetMessagesCommand): Promise<GetMessagesResult[]>;
  deleteMessagesByChatId(chatId: number): Promise<void>;
}
