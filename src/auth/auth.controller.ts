import {
  Body,
  ConflictException,
  Controller,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '@/users/users.service';
import { RegisterUserDto } from './dto/auth.dto';
import { IsPublic } from '@/common/decorator/isPublic.decorator';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { BasicTokenGuard } from './guard/basic-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login/email')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
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
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenAccess(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      accessToken: this.authService.rotateToken(token, 'access'),
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers('Authorization') rowToken: string) {
    const token = this.authService.extractTokenFromHeader(rowToken, 'Bearer');

    return {
      refreshToken: this.authService.rotateToken(token, 'refresh'),
    };
  }
}
