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
import { RegisterUserDto } from './dto/auth.dto';
import { IsPublic } from '@/common/decorator/isPublic.decorator';

import {
  OnlyBasicTokenGuard,
  OnlyRefreshTokenGuard,
} from './decorator/OnlyTokenGuard.decorator';

import { AuthUser } from './decorator/authUser.decorator';
import { UserEntity } from '@/users/entites/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getAuth(@AuthUser() user: UserEntity) {
    return user;
  }

  @Post('login/email')
  @OnlyBasicTokenGuard()
  loginEmail(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Basic');

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('join/email')
  @IsPublic()
  async joinEmail(@Body() registerUser: RegisterUserDto) {
    if (await this.userService.getUserByEmail(registerUser.email))
      throw new ConflictException('User already exists');

    return this.authService.registerWithEmail(registerUser);
  }

  @Post('token/access')
  @OnlyRefreshTokenGuard()
  postTokenAccess(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      accessToken: this.authService.rotateToken(token, 'access'),
    };
  }

  @Post('token/refresh')
  @OnlyRefreshTokenGuard()
  postTokenRefresh(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      refreshToken: this.authService.rotateToken(token, 'refresh'),
    };
  }
}
