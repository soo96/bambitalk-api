import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ChatService } from 'src/domain/chat/chat.service';
import { CACHE_SERVICE, CacheService } from 'src/domain/common/cache/cache.service';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { CoupleService } from 'src/domain/couple/couple.service';
import { InviteCodeCachePayload } from 'src/domain/couple/payload/invite-code-cache.payload';
import { MessageService } from 'src/domain/message/message.service';
import { ScheduleService } from 'src/domain/schedule/schedule.service';
import { USER_REPOSITORY, UserRepository } from 'src/domain/user/user.repository';
import { UserService } from 'src/domain/user/user.service';
import { GenerateInviteCodeResult } from 'src/infrastructure/couple/result/generate-invite-code.result';
import { Transactional } from 'src/interfaces/common/decorators/transactional.decorator';
import { CACHE } from 'src/support/constants';

@Injectable()
export class CoupleUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(CACHE_SERVICE)
    private readonly cacheService: CacheService,
    private readonly coupleService: CoupleService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly scheduleService: ScheduleService
  ) {}

  async issueInviteCode(userId: number): Promise<GenerateInviteCodeResult> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new DomainCustomException(404, DomainErrorCode.USER_NOT_FOUND);
    }

    if (user.spouseId) {
      throw new DomainCustomException(409, DomainErrorCode.SPOUSE_ALREADY_EXIST);
    }

    const coupleKey = `couple:${user.coupleId}:invite`;
    const existingCode = await this.cacheService.get(coupleKey);

    if (existingCode) {
      const ttl = await this.cacheService.getTTL(coupleKey);

      return {
        inviteCode: existingCode,
        expiredAt: new Date(Date.now() + ttl * 1000),
      };
    }

    let newCode: string;

    do {
      newCode = nanoid(6).toUpperCase();
    } while (await this.cacheService.exists(`invite:${newCode}`));

    await this.cacheService.set(
      `invite:${newCode}`,
      JSON.stringify({
        coupleId: user.coupleId,
        userId: userId,
      }),
      CACHE.INVITE_CODE_TTL
    );

    await this.cacheService.set(coupleKey, newCode, CACHE.INVITE_CODE_TTL);

    return {
      inviteCode: newCode,
      expiredAt: new Date(Date.now() + CACHE.INVITE_CODE_TTL * 1000),
    };
  }

  @Transactional()
  async mergeByInviteCode(userId: number, inviteCode: string) {
    const inviteKey = `invite:${inviteCode}`;
    const cachedInviteData = await this.cacheService.get(inviteKey);

    if (!cachedInviteData) {
      throw new DomainCustomException(400, DomainErrorCode.INVALID_INVITE_CODE);
    }

    const inviteData = JSON.parse(cachedInviteData) as InviteCodeCachePayload;
    const targetCoupleId = inviteData.coupleId;
    const inviterUserId = inviteData.userId;

    await this.userService.validateUserExists(inviterUserId);
    const user = await this.userService.validateUserExists(userId);

    if (user.coupleId === targetCoupleId) {
      throw new DomainCustomException(409, DomainErrorCode.ALREADY_SAME_COUPLE);
    }

    if (user.coupleId) {
      await this.coupleService.deleteCouple(user.coupleId);
      await this.scheduleService.deleteScheduleByCoupleId(user.coupleId);

      const chats = await this.chatService.getChatsByCoupleId(user.coupleId);

      for (const chat of chats) {
        await this.messageService.deleteMessagesByChatId(chat.chatId);
      }

      await this.chatService.deleteChatByCoupleId(user.coupleId);
      // TODO: Child도 삭제
    }

    await this.userService.updateUserForMerge(userId, targetCoupleId, inviterUserId);
    await this.userService.updateUserForMerge(inviterUserId, targetCoupleId, userId);
    await this.coupleService.updateCoupleMembers(targetCoupleId, inviterUserId, userId);

    await this.cacheService.del(inviteKey);
    await this.cacheService.del(`couple:${inviteData.coupleId}:invite`);
  }
}
