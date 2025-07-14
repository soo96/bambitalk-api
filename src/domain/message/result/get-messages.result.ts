import { MessageType } from '../message.entity';

export interface GetMessagesResult {
  id: number;
  chatId: number;
  senderId: number;
  type: MessageType;
  content: string;
  isRead: boolean;
  sentAt: Date;
}
