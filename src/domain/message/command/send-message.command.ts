import { MessageType } from '../message.entity';

export interface SendMessageCommand {
  coupleId: number;
  senderId: number;
  type: MessageType;
  content: string;
}
