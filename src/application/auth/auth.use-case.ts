import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoginResponseResult } from 'src/domain/auth/result/login-response.result';
import { SOCIAL_LOGIN_CLIENT, SocialLoginClient } from 'src/domain/auth/social-login.client';
import { USER_REPOSITORY, UserRepository } from 'src/domain/user/user.repository';
import { Transactional } from 'src/interfaces/common/decorators/transactional.decorator';
import { JwtUtil } from 'src/support/jwt.util';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject(SOCIAL_LOGIN_CLIENT)
    private readonly socialLoginClient: SocialLoginClient,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtUtil: JwtUtil
  ) {}

  private readonly logger = new Logger(AuthUseCase.name);

  @Transactional()
  async loginWithSocial(accessToken: string): Promise<LoginResponseResult> {
    const { id: kakaoId } = await this.socialLoginClient.getUserInfo(accessToken);

    const user = await this.userRepository.getUserByKakaoId(kakaoId);

    if (!user) {
      return { needSignup: true };
    }

    const loginToken = this.jwtUtil.generateLoginToken({
      userId: user.userId,
    });

    return { needSignup: false, ...loginToken };
  }
}
