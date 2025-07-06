import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DomainCustomException } from 'src/domain/common/errors/domain-custrom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { JwtPayload } from 'src/support/jwt.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET 환경변수가 설정되어 있지 않습니다.');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload) {
    const { userId, coupleId } = payload;
    if (!userId || !coupleId) {
      throw new DomainCustomException(401, DomainErrorCode.UNAUTHORIZED);
    }

    return { userId, coupleId };
  }
}
