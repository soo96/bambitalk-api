import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/chat/chat.repository';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { ChatEntity } from 'src/domain/chat/chat.entity';

@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getChatsByCoupleId(coupleId: number): Promise<ChatEntity[]> {
    const chats = await this.prisma.chat.findMany({
      where: { coupleId },
    });

    return chats.map(
      (c) =>
        new ChatEntity(
          Number(c.chatId),
          Number(c.coupleId),
          Number(c.lastMessageId),
          c.lastMessageAt,
          c.createdAt,
          c.updatedAt
        )
    );
  }

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

  async deleteChatByCoupleId(coupleId: number): Promise<void> {
    await this.prisma.chat.deleteMany({
      where: { coupleId },
    });
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
