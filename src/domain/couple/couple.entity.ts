export class CoupleEntity {
  constructor(
    public readonly coupleId: number,
    public readonly inviteCode: string,
    public readonly user1Id: number,
    public readonly user2Id: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
