export interface GetMessagesCommand {
  coupleId: number;
  cursor?: number;
  limit?: number;
}
