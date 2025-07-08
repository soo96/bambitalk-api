import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/chat/chat.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { ChatEntity } from 'src/domain/chat/chat.entity';

@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createChat(coupleId: number): Promise<ChatEntity> {
    const chat = await this.prisma.chat.create({
      data: { coupleId },
    });

    return new ChatEntity(
      Number(chat.chatId),
      Number(chat.coupleId),
      chat.lastMessageId !== null ? Number(chat.lastMessageId) : null,
      chat.lastMessageAt,
      chat.createdAt,
      chat.updatedAt
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
