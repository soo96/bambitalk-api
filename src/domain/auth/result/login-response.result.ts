export interface LoginResponseResult {
  needSignup: boolean;
  kakaoId?: number;
  accessToken?: string;
  refreshToken?: string;
}
