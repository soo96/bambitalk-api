export const SOCIAL_LOGIN_CLIENT = Symbol('SOCIAL_LOGIN_CLIENT');

export interface SocialLoginClient {
  getUserInfo(accessToken: string): Promise<SocialUserInfo>;
}

export type SocialUserInfo = {
  id: number;
};
