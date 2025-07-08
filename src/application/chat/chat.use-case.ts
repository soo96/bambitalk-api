import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/domain/chat/chat.service';

@Injectable()
export class ChatUseCase {
  constructor(private readonly chatService: ChatService) {}
}
