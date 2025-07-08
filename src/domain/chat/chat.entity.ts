export class ChatEntity {
  constructor(
    public readonly chatId: number,
    public readonly coupleId: number,
    public readonly lastMessageId: number | null,
    public readonly lastMessageAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
