import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from 'src/domain/user/user.service';
import { USER_REPOSITORY } from 'src/domain/user/user.repository';
import { UserRepositoryImpl } from 'src/infrastructure/user/user.repository.impl';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
