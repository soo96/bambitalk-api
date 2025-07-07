import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/auth/auth.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CoupleModule } from './interfaces/couple/couple.module';
import { ChatModule } from './interfaces/chat/chat.module';

@Module({
  imports: [AuthModule, PrismaModule, CoupleModule, ChatModule],
})
export class AppModule {}
