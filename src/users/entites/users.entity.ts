import { PrismaEntity } from '@/common/prisma/prisma.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@Exclude()
export class UserEntity extends PrismaEntity<User> implements User {
  @ApiProperty({ name: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty({ name: 'email' })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ name: 'name' })
  @IsOptional()
  @IsString()
  @Expose()
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
