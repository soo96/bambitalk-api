export interface GetMessagesResult {
  id: number;
  chatId: number;
  senderId: number;
  text: string;
  time: Date;
  isRead: boolean;
}
