import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY, ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository
  ) {}

  async createChat(coupleId: number) {
    return await this.chatRepository.createChat(coupleId);
  }
}
