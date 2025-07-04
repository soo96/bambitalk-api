import { Logger } from '@nestjs/common';
import axios from 'axios';
import { SocialLoginClient, SocialUserInfo } from 'src/domain/auth/social-login.client';
import { DomainCustomException } from 'src/domain/common/errors/domain-custrom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { OAUTH_URL } from 'src/support/constants';

export class KakaoLoginClient implements SocialLoginClient {
  private readonly logger = new Logger(KakaoLoginClient.name);

  async getUserInfo(accessToken: string): Promise<SocialUserInfo> {
    try {
      const { data } = await axios.get<SocialUserInfo>(OAUTH_URL.USER_INFO.KAKAO, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return data;
    } catch (error) {
      this.logger.error('kakao 회원정보 조회 실패', error);
      throw new DomainCustomException(500, DomainErrorCode.AUTH_SERVER_ERROR);
    }
  }
}
