export class ChatEntity {
  constructor(
    public readonly chatId: number,
    public readonly coupleId: number,
    public readonly lastMessage: string,
    public readonly lastMessageAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
