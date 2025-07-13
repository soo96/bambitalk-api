import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY, ChatRepository } from './chat.repository';
import { ChatEntity } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository
  ) {}

  async getChatsByCoupleId(coupleId: number): Promise<ChatEntity[]> {
    return await this.chatRepository.getChatsByCoupleId(coupleId);
  }

  async createChat(coupleId: number): Promise<ChatEntity> {
    return await this.chatRepository.createChat(coupleId);
  }

  async deleteChatByCoupleId(coupleId: number): Promise<void> {
    await this.chatRepository.deleteChatByCoupleId(coupleId);
  }
}
