import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/auth/auth.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CoupleModule } from './interfaces/couple/couple.module';

@Module({
  imports: [AuthModule, PrismaModule, CoupleModule],
})
export class AppModule {}
