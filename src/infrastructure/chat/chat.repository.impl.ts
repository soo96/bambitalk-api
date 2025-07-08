import { Injectable } from '@nestjs/common';
import { ChatRepository } from 'src/domain/chat/chat.repository';
import { MessageEntity } from 'src/domain/chat/message.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { SendMessageCommand } from 'src/domain/chat/command/sendMessageDto';
import { ChatEntity } from 'src/domain/chat/chat.entity';

@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createMessage({ coupleId, senderId, content }: SendMessageCommand): Promise<MessageEntity> {
    const chat = await this.prisma.chat.findUnique({
      where: { coupleId },
    });

    if (!chat) {
      throw new Error('채팅방이 존재하지 않습니다.');
    }

    const savedMessage = await this.prisma.message.create({
      data: {
        chatId: chat.chatId,
        senderId,
        content,
      },
    });

    await this.prisma.chat.update({
      where: { chatId: chat.chatId },
      data: {
        lastMessage: savedMessage.content,
        lastMessageAt: savedMessage.sentAt,
      },
    });

    return new MessageEntity(
      Number(savedMessage.messageId),
      Number(savedMessage.chatId),
      Number(savedMessage.senderId),
      savedMessage.content,
      savedMessage.read,
      savedMessage.sentAt,
      savedMessage.createdAt,
      savedMessage.updatedAt
    );
  }

  async createChat(coupleId: number): Promise<ChatEntity> {
    const chat = await this.prisma.chat.create({
      data: { coupleId },
    });

    return new ChatEntity(
      Number(chat.chatId),
      Number(chat.coupleId),
      chat.lastMessage,
      chat.lastMessageAt,
      chat.createdAt,
      chat.updatedAt
    );
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
