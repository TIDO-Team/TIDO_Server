import {
  Body,
  ConflictException,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getAuth() {
    return { data: 'Auth Controller' };
  }

  @Post('login/email')
  loginEmail(
    @Headers('Authorization') rowToken: string,
    @Headers() headers: any,
  ) {
    console.log('rowToken', rowToken, headers);

    const token = this.authService.extractTokenFromHeader(rowToken, 'Basic');

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('join/email')
  joinEmail(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    if (this.userService.getUserByEmail(email))
      throw new ConflictException('User already exists');

    return this.authService.registerWithEmail({ email, password, name });
  }

  @Post('token/access')
  postTokenAccess(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      accessToken: this.authService.rotateToken(token, 'access'),
    };
  }

  @Post('token/refresh')
  postTokenRefresh(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      refreshToken: this.authService.rotateToken(token, 'refresh'),
    };
  }
}
