import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthUseCase } from 'src/application/auth/auth.use-case';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken } = loginDto;
    const data = await this.authUseCase.loginWithSocial(accessToken);

    return ResultResponseDto.success(data);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const command = signupDto.toCommand();
    const data = await this.authUseCase.signup(command);

    return ResultResponseDto.success(data);
  }
}
