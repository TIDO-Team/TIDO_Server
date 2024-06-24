import { PrismaRepository } from '@/common/prisma/prisma.repository';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserEntity } from './entites/users.entity';

@Injectable()
export class UserRepository extends PrismaRepository<Prisma.UserDelegate> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user, UserEntity);
  }
}
