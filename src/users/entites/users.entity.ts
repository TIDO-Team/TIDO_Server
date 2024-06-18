import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserEntity implements User {
  @ApiProperty({ name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ name: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ name: 'name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ name: 'createdAt' })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({ name: 'updatedAt' })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
