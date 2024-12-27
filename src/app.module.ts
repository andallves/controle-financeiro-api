import { Module } from '@nestjs/common';
import { UserModule } from 'src/infra/http/modules/user/user.module';
import { DatabaseModule } from 'src/infra/http/database/database.module';
import { AuthModule } from 'src/infra/http/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TransactionModule } from './infra/http/modules/transaction/transaction.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, TransactionModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {}
}
