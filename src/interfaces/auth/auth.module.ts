import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthUseCase } from 'src/application/auth/auth.use-case';
import { SOCIAL_LOGIN_CLIENT } from 'src/domain/auth/social-login.client';
import { KakaoLoginClient } from 'src/infrastructure/auth/kakao-login.client';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { USER_REPOSITORY } from 'src/domain/user/user.repository';
import { UserRepositoryImpl } from 'src/infrastructure/user/user.repository.impl';
import { JwtUtil } from 'src/support/jwt.util';
import { CoupleModule } from '../couple/couple.module';

@Module({
  imports: [UserModule, JwtModule.register({}), CoupleModule],
  controllers: [AuthController],
  providers: [
    AuthUseCase,
    {
      provide: SOCIAL_LOGIN_CLIENT,
      useClass: KakaoLoginClient,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    JwtUtil,
  ],
})
export class AuthModule {}
