import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CACHE_SERVICE, CacheService } from 'src/domain/common/cache/cache.service';
import { DomainCustomException } from 'src/domain/common/errors/domain-custom-exception';
import { DomainErrorCode } from 'src/domain/common/errors/domain-error-code';
import { USER_REPOSITORY, UserRepository } from 'src/domain/user/user.repository';
import { GenerateInviteCodeResult } from 'src/infrastructure/couple/result/generate-invite-code.result';
import { CACHE } from 'src/support/constants';

@Injectable()
export class CoupleUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(CACHE_SERVICE)
    private readonly cacheService: CacheService
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
}
