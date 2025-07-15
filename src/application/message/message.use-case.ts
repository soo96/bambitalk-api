import { Inject, Injectable } from '@nestjs/common';
import { ChatService } from 'src/domain/chat/chat.service';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import {
  FILE_UPLOAD_SERVICE,
  FileUploadService,
} from 'src/domain/common/file-uploader/file-upload.service';
import { GetMessagesCommand } from 'src/domain/message/command/get-messages.command';
import { SendMessageCommand } from 'src/domain/message/command/send-message.command';
import { MessageService } from 'src/domain/message/message.service';
import { GetMessagesResult } from 'src/domain/message/result/get-messages.result';

@Injectable()
export class MessageUseCase {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    @Inject(FILE_UPLOAD_SERVICE)
    private readonly fileUploadService: FileUploadService
  ) {}

  async saveMessage(payload: SendMessageCommand) {
    if (payload.type === 'IMAGE') {
      const url = await this.fileUploadService.uploadFile(payload.content);

      payload.content = url;
    }

    return await this.messageService.saveMessage(payload);
  }

  async getMessages(command: GetMessagesCommand): Promise<GetMessagesResult[]> {
    if (command.coupleId === null) {
      throw new DomainCustomException(401, DomainErrorCode.UNAUTHORIZED);
    }

    return await this.messageService.getMessages(command);
  }

  async readAllMessages(coupleId: number, userId: number): Promise<void> {
    const chat = await this.chatService.getChatByCoupleId(coupleId);

    if (!chat) {
      throw new Error('채팅 정보 없음');
    }

    await this.messageService.readAllMessages(chat.chatId, userId);
  }
}
