import { ChatEntity } from './chat.entity';
import { SendMessageCommand } from './command/sendMessageDto';
import { MessageEntity } from './message.entity';

export const CHAT_REPOSITORY = Symbol('CHAT_REPOSITORY');

export interface ChatRepository {
  createMessage(command: SendMessageCommand): Promise<MessageEntity>;
  createChat(coupleId: number): Promise<ChatEntity>;
}
