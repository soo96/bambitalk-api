import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/domain/message/message.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaTxContext } from '../prisma/transactional-context';
import { SendMessageCommand } from 'src/domain/message/command/send-message.command';
import { MessageRepository } from 'src/domain/message/message.repository';
import { GetMessagesCommand } from 'src/domain/message/command/get-messages.command';
import { GetMessagesResult } from 'src/domain/message/result/get-messages.result';

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
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
        lastMessageId: savedMessage.messageId,
        lastMessageAt: savedMessage.sentAt,
      },
    });

    return new MessageEntity(
      Number(savedMessage.messageId),
      Number(savedMessage.chatId),
      Number(savedMessage.senderId),
      savedMessage.content,
      savedMessage.isRead,
      savedMessage.sentAt,
      savedMessage.createdAt,
      savedMessage.updatedAt
    );
  }

  async getMessages({
    coupleId,
    cursor,
    limit = 20,
  }: GetMessagesCommand): Promise<GetMessagesResult[]> {
    const chat = await this.prisma.chat.findUnique({
      where: { coupleId },
    });

    const chatId = Number(chat?.chatId);

    const messages = await this.prisma.message.findMany({
      where: { chatId },
      take: limit,
      orderBy: { sentAt: 'desc' },
      ...(cursor && {
        skip: 1,
        cursor: { messageId: cursor },
      }),
    });

    return messages.map((m) => ({
      id: Number(m.messageId),
      chatId: Number(m.chatId),
      senderId: Number(m.senderId),
      text: m.content,
      time: m.createdAt,
      isRead: m.isRead,
    }));
  }

  async readAllMessages(chatId: number, userId: number): Promise<void> {
    await this.prisma.message.updateMany({
      data: { isRead: true },
      where: {
        chatId,
        isRead: false,
        senderId: { not: userId },
      },
    });
  }

  async deleteMessagesByChatId(chatId: number): Promise<void> {
    await this.prisma.message.deleteMany({
      where: { chatId },
    });
  }

  private get prisma() {
    return PrismaTxContext.get() ?? this.prismaService;
  }
}
