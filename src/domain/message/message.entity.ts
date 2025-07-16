export class MessageEntity {
  constructor(
    public readonly messageId: number,
    public readonly chatId: number,
    public readonly senderId: number,
    public readonly type: MessageType,
    public readonly content: string,
    public readonly isRead: boolean,
    public readonly sentAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export const MessageType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
