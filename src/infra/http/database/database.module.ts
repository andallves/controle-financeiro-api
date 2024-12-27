import { Module } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { PrismaService } from 'src/infra/http/database/prisma/prisma.service';
import { PrismaUserRepository } from 'src/infra/http/database/prisma/repositories/prisma-user.repository';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { PrismaTransactionRepository } from 'src/infra/http/database/prisma/repositories/prisma-transaction.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [UserRepository, TransactionRepository],
})
export class DatabaseModule {}
