import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCase/createUserUseCase/create-user.useCase';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/http/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
