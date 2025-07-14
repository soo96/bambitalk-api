export class MessageEntity {
  constructor(
    public readonly messageId: number,
    public readonly chatId: number,
    public readonly senderId: number,
    public readonly content: string,
    public readonly isRead: boolean,
    public readonly sentAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
