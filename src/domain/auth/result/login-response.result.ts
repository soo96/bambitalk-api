export interface LoginResponseResult {
  needSignup: boolean;
  kakaoId?: number;
  accessToken?: string;
  refreshToken?: string;
  user?: UserResponse;
}

export interface UserResponse {
  userId: number;
  coupleId: number | null;
  spouseId: number | null;
  nickname: string;
}
