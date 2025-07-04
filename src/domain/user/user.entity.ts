export class UserEntity {
  constructor(
    public readonly userId: number,
    public readonly nickname: string,
    public readonly role: Role,
    public readonly coupleId: number | null,
    public readonly kakaoId: number,
    public readonly isDeleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export const Role = {
  DAD: 'DAD',
  MOM: 'MOM',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
