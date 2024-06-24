import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entites/users.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'password',
  'name',
]) {}

export class FindUserByIdDto extends PickType(UserEntity, ['id']) {}
