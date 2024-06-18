import { IsPublic } from '@/common/decorator/isPublic.decorator';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { RefreshTokenGuard } from '../guard/bearer-token.guard';
import { BasicTokenGuard } from '../guard/basic-token.guard';

export const OnlyRefreshTokenGuard = () =>
  applyDecorators(IsPublic(), UseGuards(RefreshTokenGuard));

export const OnlyBasicTokenGuard = () =>
  applyDecorators(IsPublic(), UseGuards(BasicTokenGuard));
