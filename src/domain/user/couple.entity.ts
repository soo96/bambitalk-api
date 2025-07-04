export class Couple {
  constructor(
    public readonly id: number,
    public readonly inviteCode: string,
    public readonly user1Id: number,
    public readonly user2Id: number | null,
    public readonly createdAt: Date
  ) {}
}
