import { UserEntity } from '@/users/entites/users.entity';
import { PickType } from '@nestjs/swagger';

export class RegisterUserDto extends PickType(UserEntity, [
  'name',
  'email',
  'password',
]) {}
