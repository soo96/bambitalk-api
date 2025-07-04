import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/auth/auth.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
})
export class AppModule {}
