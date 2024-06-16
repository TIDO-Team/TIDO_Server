import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { TypeSafeConfigModule } from './common/config/config.module';

@Module({
  imports: [PrismaModule, TypeSafeConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
