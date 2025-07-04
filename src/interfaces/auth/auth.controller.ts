import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthUseCase } from 'src/application/auth/auth.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken } = loginDto;

    return this.authUseCase.loginWithSocial(accessToken);
  }
}
