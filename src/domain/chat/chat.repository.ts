import { ChatEntity } from './chat.entity';

export const CHAT_REPOSITORY = Symbol('CHAT_REPOSITORY');

export interface ChatRepository {
  createChat(coupleId: number): Promise<ChatEntity>;
}
