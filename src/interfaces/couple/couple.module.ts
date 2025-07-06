import { Module } from '@nestjs/common';
import { COUPLE_REPOSITORY } from 'src/domain/couple/couple.repository';
import { CoupleService } from 'src/domain/couple/couple.service';
import { CoupleRepositoryImpl } from 'src/infrastructure/couple/couple.repository.impl';

@Module({
  providers: [
    CoupleService,
    {
      provide: COUPLE_REPOSITORY,
      useClass: CoupleRepositoryImpl,
    },
  ],
  exports: [CoupleService, COUPLE_REPOSITORY],
})
export class CoupleModule {}
