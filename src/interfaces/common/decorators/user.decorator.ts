import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/support/jwt.util';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtPayload => {
  const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
  return request.user;
});
