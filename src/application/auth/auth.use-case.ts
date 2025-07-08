import { Inject, Injectable, Logger } from '@nestjs/common';
import { SignupCommand } from 'src/domain/auth/command/signup.command';
import { LoginResponseResult } from 'src/domain/auth/result/login-response.result';
import { SignupResponseResult } from 'src/domain/auth/result/signup-response.result';
import { SOCIAL_LOGIN_CLIENT, SocialLoginClient } from 'src/domain/auth/social-login.client';
import { ChatService } from 'src/domain/chat/chat.service';
import { CoupleService } from 'src/domain/couple/couple.service';
import { USER_REPOSITORY, UserRepository } from 'src/domain/user/user.repository';
import { UserService } from 'src/domain/user/user.service';
import { Transactional } from 'src/interfaces/common/decorators/transactional.decorator';
import { JwtUtil } from 'src/support/jwt.util';

@Injectable()
export class AuthUseCase {
  constructor(
    @Inject(SOCIAL_LOGIN_CLIENT)
    private readonly socialLoginClient: SocialLoginClient,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtUtil: JwtUtil,
    private readonly userService: UserService,
    private readonly coupleService: CoupleService,
    private readonly chatService: ChatService
  ) {}

  private readonly logger = new Logger(AuthUseCase.name);

  @Transactional()
  async loginWithSocial(accessToken: string): Promise<LoginResponseResult> {
    const { id: kakaoId } = await this.socialLoginClient.getUserInfo(accessToken);

    const user = await this.userRepository.getUserByKakaoId(kakaoId);

    if (!user) {
      return { needSignup: true, kakaoId };
    }

    const loginToken = this.jwtUtil.generateLoginToken({
      userId: user.userId,
      coupleId: user.coupleId,
      spouseId: user.spouseId,
    });

    await this.userService.saveRefreshToken(user.userId, loginToken.refreshToken);

    return {
      needSignup: false,
      ...loginToken,
      user: {
        userId: user.userId,
        coupleId: user.coupleId,
        spouseId: user.spouseId,
        nickname: user.nickname,
      },
    };
  }

  @Transactional()
  async signup(command: SignupCommand): Promise<SignupResponseResult> {
    const { kakaoId, nickname, role } = command;

    const user = await this.userService.createUserWithToken(kakaoId, nickname, role);

    const couple = await this.coupleService.createCouple(user.userId);

    await this.userRepository.updateCoupleId(user.userId, couple.coupleId);

    await this.chatService.createChat(couple.coupleId);

    const loginToken = this.jwtUtil.generateLoginToken({
      userId: user.userId,
      coupleId: user.coupleId,
      spouseId: user.spouseId,
    });

    await this.userService.saveRefreshToken(user.userId, loginToken.refreshToken);

    return {
      ...loginToken,
      user: {
        userId: user.userId,
        coupleId: user.coupleId,
        spouseId: user.spouseId,
        nickname: user.nickname,
      },
    };
  }
}
