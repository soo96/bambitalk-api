import { UserResponse } from './login-response.result';

export interface SignupResponseResult {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}
