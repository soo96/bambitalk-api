export interface LoginResponseResult {
  needSignup: boolean;
  accessToken?: string;
  refreshToken?: string;
}
