import { Module } from '@nestjs/common';
import { AuthModule } from './interfaces/auth/auth.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { CoupleModule } from './interfaces/couple/couple.module';
import { ChatModule } from './interfaces/chat/chat.module';
import { MessageModule } from './interfaces/message/message.module';

@Module({
  imports: [AuthModule, PrismaModule, CoupleModule, ChatModule, MessageModule],
})
export class AppModule {}
